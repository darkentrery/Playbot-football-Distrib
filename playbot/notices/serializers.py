from rest_framework import serializers

from playbot.events.serializers import EventListSerializer
from playbot.notices.models import UserNotice, Notice


class NoticeSerializer(serializers.ModelSerializer):
    event = EventListSerializer(read_only=True)

    class Meta:
        model = Notice
        fields = "__all__"


class UserNoticeSerializer(serializers.ModelSerializer):
    notice = NoticeSerializer(read_only=True)

    class Meta:
        model = UserNotice
        fields = ["id", "user", "notice", "time_read", "show", "is_read"]
        read_only_fields = fields
