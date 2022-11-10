from rest_framework import serializers

from playbot.events.models import Event


class CreateEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ["name", "date", "time_begin", "address", "count_players", "notice"]

    # def create(self, validated_data):
    #     instance = self.Meta.model(**validated_data)
    #     password = validated_data.pop("password", None)
    #     if password is not None:
    #         instance.set_password(password)
    #         instance.username = instance.email
    #     instance.save()
    #     return instance