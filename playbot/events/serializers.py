from rest_framework import serializers

from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles
from playbot.users.models import User
from playbot.users.serializers import UserSerializer


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "address", "count_players", "is_player", "notice", "organizer"]


class EventSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")
    distribution_method = serializers.SlugRelatedField(queryset=DistributionMethod.objects.all(), slug_field="name")
    duration = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="name")
    count_circles = serializers.SlugRelatedField(queryset=CountCircles.objects.all(), slug_field="name")
    event_player = serializers.StringRelatedField(many=True)
    organizer = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


class EditEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


class CancelReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CancelReasons
        fields = "__all__"


class EventStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStep
        fields = "__all__"


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = ["name",]


class DistributionMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributionMethod
        fields = ["name",]


class DurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Duration
        fields = ["name",]


class CountCirclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountCircles
        fields = ["name",]


class SetRegulationSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")
    distribution_method = serializers.SlugRelatedField(queryset=DistributionMethod.objects.all(), slug_field="name")
    duration = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="name")
    count_circles = serializers.SlugRelatedField(queryset=CountCircles.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = ["format", "distribution_method", "duration", "count_circles", "scorer", "until_goal",]

