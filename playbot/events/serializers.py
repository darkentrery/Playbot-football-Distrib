from rest_framework import serializers

from playbot.events.models import Event
from playbot.users.models import User


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Event
        fields = ["name", "date", "time_begin", "address", "count_players", "is_player", "notice", "organizer"]
