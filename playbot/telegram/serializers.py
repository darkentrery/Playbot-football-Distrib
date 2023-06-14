from rest_framework import serializers

from playbot.telegram.models import TelegramChannel


class TelegramChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramChannel
        fields = ["id", "name", "has_bot"]
        read_only_fields = fields


class UpdateTelegramChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramChannel
        fields = ["channel_id", "has_bot"]
