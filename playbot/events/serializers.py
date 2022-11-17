from rest_framework import serializers

from playbot.events.models import Event


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)

    class Meta:
        model = Event
        fields = ["name", "date", "time_begin", "address", "count_players", "is_player", "notice"]
