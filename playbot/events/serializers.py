from rest_framework import serializers

from playbot.cities.models import Field
from playbot.cities.serializers import FieldSerializer
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer, Team, TeamPlayer, EventGame, EventQueue, Goal, GamePeriod, Color, PlayerNumber
from playbot.telegram.models import TelegramChannel
from playbot.telegram.serializers import TelegramChannelSerializer
from playbot.users.models import User, Position, Gender


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ["id", "name"]
        read_only_fields = fields


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ["id", "name", "acronym"]
        read_only_fields = fields


class UserSerializer(serializers.ModelSerializer):
    position_1 = PositionSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "gender", "last_name", "photo", "position_1", "rank"]
        read_only_fields = fields


class EventPlayerSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = EventPlayer
        fields = ["player", "played", "wins", "do_goals", "do_assist", "delta_rank"]
        read_only_fields = fields


class EventQueueSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)

    class Meta:
        model = EventQueue
        fields = ["id", "player", "number"]
        read_only_fields = fields


class EventStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStep
        fields = ["id", "step", "complete"]
        read_only_fields = fields


class PlayerNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerNumber
        fields = ["id", "number"]
        read_only_fields = fields


class TeamPlayerSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)
    number = PlayerNumberSerializer(read_only=True)

    class Meta:
        model = TeamPlayer
        fields = ["id", "player", "number", "do_goals", "do_assist", "delta_rank"]
        read_only_fields = fields


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "color", "color_hex"]
        read_only_fields = fields


class TeamSerializer(serializers.ModelSerializer):
    team_players = serializers.SerializerMethodField(method_name="get_team_players")
    color = ColorSerializer(read_only=True)

    class Meta:
        model = Team
        fields = ["id", "name", "count_players", "number", "wins", "loss", "nothing", "played", "scores", "do_goals",
                  "miss_goals", "team_players", "color"]
        read_only_fields = fields

    def get_team_players(self, instance):
        team_players = instance.team_players.all()
        team_players = sorted(team_players, key=lambda t: t.player.rank, reverse=True)
        return TeamPlayerSerializer(team_players, many=True, read_only=True).data


class GoalSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    player = UserSerializer(read_only=True)
    assistant = UserSerializer(read_only=True)

    class Meta:
        model = Goal
        fields = ["id", "team", "player", "time", "game_time", "score_my", "score_other", "auto", "assistant"]
        read_only_fields = fields


class CreateGoalSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(queryset=EventGame.objects.all(), write_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)
    player = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, write_only=True)
    assistant = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, write_only=True)

    class Meta:
        model = Goal
        fields = ["game", "team", "player", "time", "game_time", "auto", "assistant"]


class UpdateGoalSerializer(serializers.ModelSerializer):
    player = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, write_only=True)
    assistant = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, write_only=True, allow_null=True, allow_empty=True)

    class Meta:
        model = Goal
        fields = ["player", "auto", "assistant"]


class GamePeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePeriod
        fields = ["id", "time_begin", "time_end", "duration"]
        read_only_fields = fields


class EventGameSerializer(serializers.ModelSerializer):
    team_1 = TeamSerializer(read_only=True)
    team_2 = TeamSerializer(read_only=True)
    goals = GoalSerializer(Goal, many=True, read_only=True)
    game_periods = GamePeriodSerializer(GamePeriod, many=True, read_only=True)

    class Meta:
        model = EventGame
        fields = ["id", "team_1", "team_2", "time_begin", "time_end", "number", "goals", "current_duration", "rest_time",
                  "is_play", "score_1", "score_2", "result_1", "result_2", "game_periods", "current_duration_without_last",
                  "last_time_begin",]
        read_only_fields = fields


class EditTeamPlayerSerializer(serializers.ModelSerializer):
    number = serializers.PrimaryKeyRelatedField(queryset=PlayerNumber.objects.all(), write_only=True, required=False, allow_null=True, allow_empty=True)
    id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TeamPlayer
        fields = ["id", "number"]


class EditTeamSerializer(serializers.ModelSerializer):
    color = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all(), write_only=True, required=False)
    team_players = EditTeamPlayerSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = Team
        fields = ["name", "color", "team_players"]

    def update(self, instance, validated_data):
        team_players = validated_data.pop("team_players")
        for player in team_players:
            instance.team_players.filter(id=player["id"]).update(number_id=player["number"])
        return super(EditTeamSerializer, self).update(instance, validated_data)


class CancelReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CancelReasons
        fields = ["id", "name"]
        read_only_fields = fields


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = ["id", "name", "count", "rate"]
        read_only_fields = fields


class DistributionMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributionMethod
        fields = ["id", "name"]
        read_only_fields = fields


class DurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Duration
        fields = ["id", "name", "duration"]
        read_only_fields = fields


class CountCirclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountCircles
        fields = ["id", "name", "count"]
        read_only_fields = fields


class CreateEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizers = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, write_only=True)
    field = serializers.PrimaryKeyRelatedField(queryset=Field.objects.all(), write_only=True)
    public_in_channel = serializers.SlugRelatedField(queryset=TelegramChannel.objects.all(), slug_field="name", write_only=True, allow_null=True, allow_empty=True)
    genders = serializers.PrimaryKeyRelatedField(queryset=Gender.objects.all(), many=True, write_only=True)
    duration_opt = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="duration", required=False, allow_null=True, allow_empty=True)

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "count_players", "notice", "organizers",
                  "is_paid", "price", "field", "duration_opt", "is_news_line", "public_in_channel", "publish_time",
                  "genders", "min_age", "max_age", "min_players_rank",
                  "max_players_rank", "currency"]


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
    event_player = EventPlayerSerializer(EventPlayer, many=True, read_only=True)
    organizers = UserSerializer(User, many=True, read_only=True)
    event_step = EventStepSerializer(EventStep, many=True, read_only=True)
    cancel_reasons = serializers.SlugRelatedField(slug_field="name", read_only=True)
    teams = serializers.SerializerMethodField(method_name="get_teams")
    event_games = EventGameSerializer(EventGame, many=True, read_only=True)
    event_queues = EventQueueSerializer(EventQueue, many=True, read_only=True)
    format_label = serializers.SlugRelatedField(slug_field="name", read_only=True)
    field = FieldSerializer(read_only=True)
    public_in_channel = TelegramChannelSerializer(read_only=True)
    genders = GenderSerializer(Gender, many=True, read_only=True)
    duration_opt = DurationSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "time_end", "count_players", "cancel",
                  "cancel_reasons", "format", "distribution_method", "notice", "is_player", "organizers",
                  "count_circles", "duration", "scorer", "until_goal", "until_goal_count", "format_label", "is_paid",
                  "price", "currency", "next_number", "next_queue_number", "rank", "event_player",
                  "event_step", "teams", "event_games", "event_queues", "is_end", "is_begin", "all_games_finished",
                  "current_game_id", "count_current_players", "field", "is_delay_publish", "duration_opt",
                  "is_news_line", "public_in_channel", "publish_time", "genders", "min_age", "max_age",
                  "min_players_rank", "max_players_rank"]
        read_only_fields = fields

    def get_teams(self, instance):
        teams = instance.teams.all().order_by("number")
        teams = sorted(teams, key=lambda t: t.scores, reverse=True)
        return TeamSerializer(teams, many=True, read_only=True).data


class EventListSerializer(serializers.ModelSerializer):
    field = FieldSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ["id", "name", "field", "date", "time_begin", "time_end", "price", "rank", "count_players", "is_paid",
                  "is_end", "is_begin", "count_current_players", "event_step"]
        read_only_fields = fields


class EditEventSerializer(serializers.ModelSerializer):
    date = serializers.CharField(max_length=128, write_only=True, required=True)
    time_begin = serializers.CharField(max_length=128, write_only=True, required=True)
    organizers = UserSerializer(User, many=True, read_only=True)
    field = serializers.PrimaryKeyRelatedField(queryset=Field.objects.all(), write_only=True)
    public_in_channel = serializers.SlugRelatedField(queryset=TelegramChannel.objects.all(), slug_field="name", write_only=True, allow_null=True, allow_empty=True)
    genders = serializers.PrimaryKeyRelatedField(queryset=Gender.objects.all(), many=True, write_only=True)
    duration_opt = serializers.SlugRelatedField(queryset=Duration.objects.all(), slug_field="duration", required=False, allow_null=True, allow_empty=True)

    class Meta:
        model = Event
        fields = ["id", "name", "date", "time_begin", "field", "count_players", "is_player", "notice", "organizers",
                  "is_paid", "price", "duration_opt", "is_news_line", "public_in_channel", "publish_time", "genders",
                  "min_age", "max_age", "min_players_rank", "max_players_rank", "currency"]


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
    until_goal_count = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = Event
        fields = ["format", "distribution_method", "duration", "count_circles", "scorer", "until_goal", "until_goal_count"]

