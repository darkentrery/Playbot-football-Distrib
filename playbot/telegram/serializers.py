from rest_framework import serializers

from playbot.telegram.models import TelegramChannel


class TelegramChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = TelegramChannel
        fields = ["id", "name",]
        read_only_fields = fields
