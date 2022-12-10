from rest_framework import serializers

from playbot.cities.models import City
from playbot.cities.serializers import CitySerializer
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer
from playbot.users.models import User
from playbot.users.serializers import UserSerializer


class EventPlayerSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = "__all__"


class EventStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStep
        fields = "__all__"


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "address", "count_players", "is_player", "notice", "organizer", "city", "geo_point"]


class EventSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")
    distribution_method = serializers.SlugRelatedField(queryset=DistributionMethod.objects.all(), slug_field="name")
    duration = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="name")
    count_circles = serializers.SlugRelatedField(queryset=CountCircles.objects.all(), slug_field="name")
    event_player = EventPlayerSerializer(EventPlayer.objects.all(), many=True, read_only=True)
    organizer = UserSerializer(read_only=True)
    event_step = EventStepSerializer(EventStep.objects.all(), many=True, read_only=True)
    city = CitySerializer(read_only=True)
    cancel_reasons = serializers.SlugRelatedField(queryset=CancelReasons.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = "__all__"


class EditEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = UserSerializer(read_only=True)
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")
    cancel_reasons = serializers.SlugRelatedField(queryset=CancelReasons.objects.all(), slug_field="name", required=False)

    class Meta:
        model = Event
        fields = "__all__"


class CancelReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CancelReasons
        fields = "__all__"


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = "__all__"


class DistributionMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributionMethod
        fields = "__all__"


class DurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Duration
        fields = "__all__"


class CountCirclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountCircles
        fields = "__all__"


class SetRegulationSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")
    distribution_method = serializers.SlugRelatedField(queryset=DistributionMethod.objects.all(), slug_field="name")
    duration = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="name")
    count_circles = serializers.SlugRelatedField(queryset=CountCircles.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = ["format", "distribution_method", "duration", "count_circles", "scorer", "until_goal", "until_goal_count"]

