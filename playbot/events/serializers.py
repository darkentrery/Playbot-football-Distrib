from rest_framework import serializers

from playbot.cities.models import City, Address
from playbot.cities.serializers import CitySerializer, AddressSerializer
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer, Team, TeamPlayer, EventGame, EventQueue, Goal, GamePeriod
from playbot.users.models import User


class UserSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())
    all_games = serializers.IntegerField(read_only=True)
    rank = serializers.FloatField(read_only=True)
    wins = serializers.IntegerField(read_only=True)
    count_goals = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = "__all__"
        read_only_field = ['is_active',]


class EventPlayerSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = "__all__"


class EventQueueSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = EventQueue
        fields = "__all__"


class EventStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStep
        fields = "__all__"


class TeamPlayerSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = TeamPlayer
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    team_players = TeamPlayerSerializer(TeamPlayer.objects.all(), many=True, read_only=True)
    wins = serializers.IntegerField(read_only=True)
    loss = serializers.IntegerField(read_only=True)
    nothing = serializers.IntegerField(read_only=True)
    played = serializers.IntegerField(read_only=True)
    scores = serializers.IntegerField(read_only=True)
    do_goals = serializers.IntegerField(read_only=True)
    miss_goals = serializers.IntegerField(read_only=True)

    class Meta:
        model = Team
        fields = "__all__"


class GoalSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    player = UserSerializer(read_only=True)

    class Meta:
        model = Goal
        fields = "__all__"


class CreateGoalSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(queryset=EventGame.objects.all(), write_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)
    player = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, write_only=True)

    class Meta:
        model = Goal
        fields = ["game", "team", "player", "time", "game_time"]


class GamePeriodSerializer(serializers.ModelSerializer):
    duration = serializers.IntegerField(read_only=True)

    class Meta:
        model = GamePeriod
        fields = "__all__"


class EventGameSerializer(serializers.ModelSerializer):
    team_1 = TeamSerializer(read_only=True)
    team_2 = TeamSerializer(read_only=True)
    score_1 = serializers.IntegerField(read_only=True)
    score_2 = serializers.IntegerField(read_only=True)
    goals = GoalSerializer(Goal.objects.all(), many=True, read_only=True)
    game_periods = GamePeriodSerializer(GamePeriod.objects.all(), many=True, read_only=True)
    current_duration = serializers.IntegerField(read_only=True)
    rest_time = serializers.IntegerField(read_only=True)
    is_play = serializers.BooleanField(read_only=True)

    class Meta:
        model = EventGame
        fields = "__all__"


class EditTeamNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["name",]


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


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")
    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), write_only=True)
    format_label = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "address", "count_players", "is_player", "notice", "organizer",
                  "city", "geo_point", "format_label", "is_paid", "price"]


class EventForPlayerListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ["date",]
        read_only_fields = fields


class EventSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(slug_field="name", read_only=True)
    distribution_method = serializers.SlugRelatedField(slug_field="name", read_only=True)
    duration = DurationSerializer(read_only=True)
    count_circles = serializers.SlugRelatedField(slug_field="name", read_only=True)
    event_player = EventPlayerSerializer(EventPlayer.objects.all(), many=True, read_only=True)
    organizer = UserSerializer(read_only=True)
    event_step = EventStepSerializer(EventStep.objects.all(), many=True, read_only=True)
    city = CitySerializer(read_only=True)
    cancel_reasons = serializers.SlugRelatedField(slug_field="name", read_only=True)
    address = AddressSerializer(read_only=True)
    # teams = TeamSerializer(Team.objects.all().order_by("-number"), many=True, read_only=True)
    teams = serializers.SerializerMethodField(method_name="get_teams")
    event_games = EventGameSerializer(EventGame.objects.all(), many=True, read_only=True)
    event_queues = EventQueueSerializer(EventQueue.objects.all(), many=True, read_only=True)
    format_label = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Event
        fields = "__all__"

    def get_teams(self, instance):
        teams = instance.teams.all().order_by("number")
        teams = sorted(teams, key=lambda t: t.scores, reverse=True)
        return TeamSerializer(teams, many=True, read_only=True).data


class EditEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizer = UserSerializer(read_only=True)
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")
    cancel_reasons = serializers.SlugRelatedField(queryset=CancelReasons.objects.all(), slug_field="name", required=False)
    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), write_only=True)
    format_label = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = "__all__"


class CancelEventSerializer(serializers.ModelSerializer):
    cancel_reasons = serializers.SlugRelatedField(queryset=CancelReasons.objects.all(), slug_field="name", required=False)

    class Meta:
        model = Event
        fields = ["cancel", "cancel_reasons",]


class SetRegulationSerializer(serializers.ModelSerializer):
    format = serializers.SlugRelatedField(queryset=Format.objects.all(), slug_field="name")
    distribution_method = serializers.SlugRelatedField(queryset=DistributionMethod.objects.all(), slug_field="name")
    duration = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="name")
    count_circles = serializers.SlugRelatedField(queryset=CountCircles.objects.all(), slug_field="name")

    class Meta:
        model = Event
        fields = ["format", "distribution_method", "duration", "count_circles", "scorer", "until_goal", "until_goal_count"]

