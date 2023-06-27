import hashlib
import hmac
import json
import re
from urllib.parse import parse_qsl
from hashlib import sha256

import jwt
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.serializers import PasswordField
from rest_framework_simplejwt.settings import api_settings
from django.utils.translation import gettext_lazy as _

from config.settings.base import SOCIAL_AUTH_TELEGRAM_BOT_TOKEN
from playbot.users.models import User, RankHistory


class ObtainMixin:
    username_field = get_user_model().USERNAME_FIELD
    token_class = None
    default_error_messages = {
        "no_active_account": _("No active account found with the given credentials")
    }

    @classmethod
    def get_token(cls, user):
        return cls.token_class.for_user(user)


class CustomTokenObtainSerializer(ObtainMixin, serializers.Serializer):
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


class TokenObtainTelegramSerializer(ObtainMixin, serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["auth_date"] = serializers.CharField()
        self.fields["first_name"] = serializers.CharField()
        self.fields["hash"] = serializers.CharField()
        self.fields["id"] = serializers.CharField()
        self.fields["last_name"] = serializers.CharField()
        self.fields["photo_url"] = serializers.CharField()
        self.fields["username"] = serializers.CharField()
        # self.fields["address"] = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

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
            # if attrs.get("address"):
            #     defaults["address"] = attrs.get("address")
            defaults["is_active"] = True
            self.user, update = User.objects.update_or_create(telegram_id=attrs["id"], defaults=defaults)
            if not self.user.ranks_history.all().exists():
                RankHistory.objects.create(user=self.user)

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


class TokenObtainTelegramAppSerializer(ObtainMixin, serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["first_name"] = serializers.CharField()
        self.fields["hash"] = serializers.CharField()
        self.fields["id"] = serializers.CharField()
        self.fields["last_name"] = serializers.CharField(required=False, allow_null=True, allow_blank=True)
        self.fields["username"] = serializers.CharField()

    def validate(self, attrs):
        defaults = {}
        if attrs.get("first_name"):
            defaults["first_name"] = attrs.get("first_name")
        if attrs.get("last_name"):
            defaults["last_name"] = attrs.get("last_name")
        if attrs.get("username"):
            defaults["username"] = attrs.get("username")
        # if attrs.get("address"):
        #     defaults["address"] = attrs.get("address")
        defaults["is_active"] = True
        self.user, update = User.objects.update_or_create(telegram_id=attrs["id"], defaults=defaults)
        if not self.user.ranks_history.all().exists():
            RankHistory.objects.create(user=self.user)

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


class TokenObtainLoginAppleSerializer(ObtainMixin, serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["id_token"] = serializers.CharField()

    def validate(self, attrs):
        decoded = jwt.decode(attrs.get("id_token"), audience="ru.korobkaplay.test.auth", options={"verify_signature": False})
        apple_id = decoded["sub"]
        defaults = {
            "is_active": True,
            "username": decoded["email"],
        }
        self.user, update = User.objects.update_or_create(apple_id=apple_id, email=decoded["email"], defaults=defaults)
        if not self.user.ranks_history.all().exists():
            RankHistory.objects.create(user=self.user)
        # users = User.objects.filter(apple_id=apple_id)
        # if users.exists():
        #     self.user = users.first()
        # else:
        #     raise exceptions.AuthenticationFailed(
        #         self.error_messages["no_active_account"],
        #         "no_active_account",
        #     )
        authenticate_kwargs = {
            self.username_field: self.user.email,
            "password": self.user.password,
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}


class TokenObtainSignUpAppleSerializer(ObtainMixin, serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["id_token"] = serializers.CharField()
        self.fields["email"] = serializers.CharField()
        self.fields["name"] = serializers.DictField()

    def validate(self, attrs):
        decoded = jwt.decode(attrs.get("id_token"), audience="ru.korobkaplay.test.auth", options={"verify_signature": False})
        apple_id = decoded["sub"]
        defaults = {
            "is_active": True,
            "first_name": attrs["name"]["firstName"],
            "last_name": attrs["name"]["lastName"],
            "username": attrs["email"],
        }
        self.user, update = User.objects.update_or_create(apple_id=apple_id, email=attrs["email"], defaults=defaults)
        if not self.user.ranks_history.all().exists():
            RankHistory.objects.create(user=self.user)
        authenticate_kwargs = {
            self.username_field: self.user.email,
            "password": self.user.password,
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}


class TokenObtainFirstSignUpSerializer(ObtainMixin, serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["slug"] = serializers.CharField()

    def validate(self, attrs):
        self.user = User.objects.get(confirm_slug=attrs["slug"])
        return {}
