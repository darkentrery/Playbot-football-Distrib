from rest_framework import serializers

from playbot.events.serializers import EventSerializer
from playbot.notices.models import UserNotice, Notice


class NoticeSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)

    class Meta:
        model = Notice
        fields = "__all__"


class UserNoticeSerializer(serializers.ModelSerializer):
    notice = NoticeSerializer(read_only=True)

    class Meta:
        model = UserNotice
        fields = "__all__"