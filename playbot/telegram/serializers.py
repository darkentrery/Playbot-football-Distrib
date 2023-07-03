from rest_framework import serializers

from playbot.telegram.models import TelegramChannel
from playbot.users.models import User


class TelegramChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramChannel
        fields = ["id", "name", "has_bot"]
        read_only_fields = fields


class UpdateTelegramChannelSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, required=False, write_only=True)
    admins = serializers.SlugRelatedField(slug_field="telegram_id", queryset=User.objects.all(), required=False, many=True)

    class Meta:
        model = TelegramChannel
        fields = ["channel_id", "has_bot", "admins", "name"]


class CreateTelegramChannelSerializer(serializers.ModelSerializer):
    admins = serializers.SlugRelatedField(slug_field="telegram_id", queryset=User.objects.all(), required=False, many=True)

    class Meta:
        model = TelegramChannel
        fields = ["name", "channel_id", "has_bot", "admins"]
