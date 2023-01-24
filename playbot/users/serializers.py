import hashlib
import hmac
import re

from django.contrib.auth import get_user_model, authenticate
from loguru import logger
from rest_framework import serializers, exceptions
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import PasswordField
from rest_framework_simplejwt.settings import api_settings
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

from config.settings.base import SOCIAL_AUTH_TELEGRAM_BOT_TOKEN
from playbot.cities.models import City
from playbot.events.models import EventPlayer, Event
from playbot.events.serializers import EventSerializer
from playbot.notices.models import Notice
from playbot.notices.serializers import UserNoticeSerializer
from playbot.users.models import User, Position
from playbot.users.utils import generate_password, send_email_refresh, send_email_confirm_sign_up


class EventPlayerSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = "__all__"


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())
    all_games = serializers.IntegerField(read_only=True)
    count_goals = serializers.IntegerField(read_only=True)
    wins = serializers.IntegerField(read_only=True)
    loss = serializers.IntegerField(read_only=True)
    event_player = EventPlayerSerializer(EventPlayer.objects.all(), many=True, read_only=True)
    event = EventSerializer(Event.objects.all(), many=True, read_only=True)
    position_1 = PositionSerializer(read_only=True)
    position_2 = PositionSerializer(read_only=True)
    favorite_events = EventSerializer(Event.objects.all(), many=True, read_only=True)
    user_notices = UserNoticeSerializer(Notice, many=True, read_only=True)
    total_time = serializers.IntegerField(read_only=True)
    all_rivals = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = "__all__"
        read_only_field = ['is_active',]


class UpdateUserSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())
    position_1 = serializers.SlugRelatedField(slug_field="name", queryset=Position.objects.all(), required=False)
    position_2 = serializers.SlugRelatedField(slug_field="name", queryset=Position.objects.all(), required=False)

    class Meta:
        model = User
        fields = ["username", "birthday", "email", "gender", "phone_number", "city", "position_1", "position_2", "photo", "about_self"]


class UpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password",]

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class CustomTokenObtainSerializer(serializers.Serializer):
    username_field = get_user_model().USERNAME_FIELD
    token_class = None

    default_error_messages = {
        "no_active_account": _("No active account found with the given credentials")
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields["password"] = PasswordField()

    def validate(self, attrs):
        is_email = re.search(r"\D{1,}", attrs[self.username_field])
        if not is_email:
            users = User.objects.filter(phone_number=attrs[self.username_field])
            if users.count() == 1:
                attrs[self.username_field] = users.first().email
            if not users.exists():
                raise exceptions.AuthenticationFailed(
                    detail="No exists number!"
                )
            if users.exists() and not users.first().is_active:
                raise exceptions.AuthenticationFailed(
                    detail="Is not active!"
                )
        else:
            users = User.objects.filter(email=attrs[self.username_field])
            if not users.exists():
                raise exceptions.AuthenticationFailed(
                    detail="No exists email!"
                )
            if users.exists() and not users.first().is_active:
                raise exceptions.AuthenticationFailed(
                    detail="Is not active!"
                )
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}

    @classmethod
    def get_token(cls, user):
        return cls.token_class.for_user(user)


class TokenObtainTelegramSerializer(serializers.Serializer):
    username_field = get_user_model().USERNAME_FIELD
    token_class = None

    default_error_messages = {
        "no_active_account": _("No active account found with the given credentials")
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["auth_date"] = serializers.CharField()
        self.fields["first_name"] = serializers.CharField()
        self.fields["hash"] = serializers.CharField()
        self.fields["id"] = serializers.CharField()
        self.fields["last_name"] = serializers.CharField()
        self.fields["photo_url"] = serializers.CharField()
        self.fields["username"] = serializers.CharField()

        # self.fields["telegram_id"] = serializers.CharField()
        # self.fields["chanel_id"] = serializers.CharField()

    def check_response(self, data):
        d = data.copy()
        del d['hash']
        d_list = []
        for key in sorted(d.keys()):
            if d[key] != None:
                d_list.append(key + '=' + d[key])
        data_string = bytes('\n'.join(d_list), 'utf-8')

        secret_key = hashlib.sha256(SOCIAL_AUTH_TELEGRAM_BOT_TOKEN.encode('utf-8')).digest()
        hmac_string = hmac.new(secret_key, data_string, hashlib.sha256).hexdigest()
        if hmac_string == data['hash']:
            return True
        return False

    def validate(self, attrs):
        if self.check_response(attrs):
            defaults = {}
            if attrs.get("first_name"):
                defaults["first_name"] = attrs.get("first_name")
            if attrs.get("last_name"):
                defaults["last_name"] = attrs.get("last_name")
            if attrs.get("username"):
                defaults["username"] = attrs.get("username")
            defaults["is_active"] = True
            self.user, update = User.objects.update_or_create(telegram_id=attrs["id"], defaults=defaults)

        # if User.objects.filter(telegram_id=attrs["telegram_id"]).exists() and attrs["chanel_id"] == CHANEL_ID:
        #     self.user = User.objects.get(telegram_id=attrs["telegram_id"])
        else:
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )
        authenticate_kwargs = {
            self.username_field: self.user.email,
            "password": self.user.password,
            # "password": "admin",
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        # self.user = authenticate(**authenticate_kwargs)
        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}

    @classmethod
    def get_token(cls, user):
        return cls.token_class.for_user(user)


class LoginSerializer(CustomTokenObtainSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class LoginTelegramSerializer(TokenObtainTelegramSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class SignUpSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=128, write_only=True, required=False)
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())
    # email = serializers.EmailField(required=True, write_only=True, max_length=128)
    # password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "phone_number", "email", "password", "city")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        password = validated_data.pop("password", None)
        slug = generate_password()
        instance.confirm_slug = slug
        if password is not None:
            instance.set_password(password)

        instance.save()
        send_email_confirm_sign_up(instance.email, slug)
        return instance

    def is_valid(self, *, raise_exception=False):
        assert hasattr(self, 'initial_data'), (
            'Cannot call `.is_valid()` as no `data=` keyword argument was '
            'passed when instantiating the serializer instance.'
        )

        if not hasattr(self, '_validated_data'):
            try:
                self._validated_data = self.run_validation(self.initial_data)
            except ValidationError as exc:
                self._validated_data = {}
                self._errors = exc.detail
            else:
                self._errors = {}
            if self.validated_data.get("email") and User.objects.filter(email=self.validated_data["email"]).exists():
                self._errors["email"] = "User with this email already exists!"
            if self.validated_data.get("phone_number") and User.objects.filter(phone_number=self.validated_data["phone_number"]).exists():
                self._errors["phone_number"] = "User with this phone_number already exists!"
            if self.validated_data.get("email") and User.objects.filter(username=self.validated_data["username"]).exists():
                self._errors["username"] = "User with this username already exists!"

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)


class SignUpTelegramSerializer(serializers.ModelSerializer):
    telegram_id = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ("telegram_id",)

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        password = "1234"
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def is_valid(self, *, raise_exception=False):
        assert hasattr(self, 'initial_data'), (
            'Cannot call `.is_valid()` as no `data=` keyword argument was '
            'passed when instantiating the serializer instance.'
        )

        if not hasattr(self, '_validated_data'):
            try:
                self._validated_data = self.run_validation(self.initial_data)
            except ValidationError as exc:
                self._validated_data = {}
                self._errors = exc.detail
            else:
                self._errors = {}
            if self.validated_data.get("telegram_id") and User.objects.filter(email=self.validated_data["telegram_id"]).exists():
                self._errors["telegram_id"] = "User with this telegram_id already exists!"

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)


class RefreshPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = ("email",)

    @logger.catch
    def update(self):
        email = self.validated_data.get("email")
        instance = None
        users = User.objects.filter(email=email)
        if users.exists():
            instance = users.first()
            password = generate_password()
            instance.set_password(password)
            instance.save()
            send_email_refresh(email, password)
            # send_message(email, password)
        else:
            self._errors["email"] = ["Invalid email!"]

        return instance


class UpdateCitySerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())

    class Meta:
        model = User
        fields = ("city",)




