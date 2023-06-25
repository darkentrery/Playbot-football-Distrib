from rest_framework import serializers

from playbot.telegram.models import TelegramChannel
from playbot.users.models import User


class TelegramChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramChannel
        fields = ["id", "name", "has_bot"]
        read_only_fields = fields


class UpdateTelegramChannelSerializer(serializers.ModelSerializer):
    admins = serializers.SlugRelatedField(slug_field="telegram_id", queryset=User.objects.all(), required=False, many=True)

    class Meta:
        model = TelegramChannel
        fields = ["channel_id", "has_bot", "admins"]
