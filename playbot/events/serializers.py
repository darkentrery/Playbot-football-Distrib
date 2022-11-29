from rest_framework import serializers

from playbot.events.models import Event, CancelReasons
from playbot.users.models import User


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "address", "count_players", "is_player", "notice", "organizer"]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class EditEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)

    class Meta:
        model = Event
        fields = "__all__"


class CancelReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CancelReasons
        fields = "__all__"
