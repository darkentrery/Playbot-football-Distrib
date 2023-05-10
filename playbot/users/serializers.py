from loguru import logger
from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken

from playbot.cities.models import City, Address
from playbot.cities.serializers import AddressSerializer
from playbot.events.models import EventPlayer, Event
from playbot.events.serializers import EventForPlayerListSerializer, EventListSerializer
from playbot.notices.models import Notice
from playbot.notices.serializers import UserNoticeSerializer
from playbot.users.models import User, Position, RankHistory
from playbot.users.obtain_serializers import TokenObtainTelegramSerializer, CustomTokenObtainSerializer, \
    TokenObtainLoginAppleSerializer, TokenObtainSignUpAppleSerializer
from playbot.users.utils import generate_password, send_email_refresh, send_email_confirm_sign_up


class EventPlayerSerializer(serializers.ModelSerializer):
    event = EventListSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = ["event",]
        read_only_fields = fields


class EventPlayerListSerializer(serializers.ModelSerializer):
    event = EventForPlayerListSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = ["event",]
        read_only_fields = fields


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ["id", "name", "acronym"]
        read_only_fields = fields


class RankHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RankHistory
        fields = ["user", "rank", "create"]
        read_only_fields = fields


class SamePlayerSerializer(serializers.ModelSerializer):
    position_1 = PositionSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "rank", "position_1"]
        read_only_fields = fields


class UserSerializer(serializers.ModelSerializer):
    event_player = EventPlayerSerializer(EventPlayer, many=True, read_only=True)
    event = EventListSerializer(Event, many=True, read_only=True)
    position_1 = PositionSerializer(read_only=True)
    position_2 = PositionSerializer(read_only=True)
    favorite_events = EventListSerializer(Event, many=True, read_only=True)
    user_notices = UserNoticeSerializer(Notice, many=True, read_only=True)
    ranks_history = RankHistorySerializer(RankHistory, many=True, read_only=True)
    same_players = SamePlayerSerializer(User, many=True, read_only=True)
    wins_percent = serializers.IntegerField(read_only=True)
    warning_notices = UserNoticeSerializer(Notice, many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "about_self", "all_games", "all_rivals", "birthday", "confirm_slug",
                  "count_goals", "date_joined", "event", "event_player", "favorite_events", "first_name", "gender",
                  "last_name", "loss", "phone_number", "photo", "position_1", "position_2", "rank", "ranking_place",
                  "ranks_history", "same_players", "telegram_id", "total_time", "user_notices", "wins", "wins_percent",
                  "warning_notices", "favorite_players", "showing_notices", "delta_rank", "address", "is_organizer"]
        read_only_fields = fields


class UserIsAuthSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", read_only=True)
    favorite_events = EventListSerializer(Event, many=True, read_only=True)
    user_notices = UserNoticeSerializer(Notice, many=True, read_only=True)
    warning_notices = UserNoticeSerializer(Notice, many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "city", "confirm_slug", "favorite_events", "phone_number", "telegram_id",
                  "user_notices", "warning_notices", "favorite_players", "showing_notices", "delta_rank", "address",
                  "is_organizer"]
        read_only_fields = fields


class UserListSerializer(serializers.ModelSerializer):
    ranks_history = RankHistorySerializer(RankHistory, many=True, read_only=True)
    wins_percent = serializers.IntegerField(read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "rank", "ranks_history", "wins", "all_games", "gender", "event_player",
                  "wins_percent", "delta_rank", "address"]
        read_only_fields = fields


class UpdateUserSerializer(serializers.ModelSerializer):
    position_1 = serializers.SlugRelatedField(slug_field="name", queryset=Position.objects.all(), required=False)
    position_2 = serializers.SlugRelatedField(slug_field="name", queryset=Position.objects.all(), required=False)
    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = User
        fields = ["username", "birthday", "email", "gender", "phone_number", "address", "position_1", "position_2",
                  "photo", "about_self"]


class UpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password",]

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class LoginMixin:
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserIsAuthSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class LoginSerializer(LoginMixin, CustomTokenObtainSerializer):
    pass


class LoginTelegramSerializer(LoginMixin, TokenObtainTelegramSerializer):
    pass


class LoginAppleSerializer(LoginMixin, TokenObtainLoginAppleSerializer):
    pass


class SignUpAppleSerializer(LoginMixin, TokenObtainSignUpAppleSerializer):
    pass


class SignUpSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=128, write_only=True, required=False)
    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), write_only=True)

    class Meta:
        model = User
        fields = ("username", "phone_number", "email", "password", "address")
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


class UpdateAddressSerializer(serializers.ModelSerializer):
    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), write_only=True)

    class Meta:
        model = User
        fields = ("address",)
