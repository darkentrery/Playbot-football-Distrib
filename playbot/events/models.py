import datetime

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from playbot.cities.models import City, Address, Field
from playbot.events.mixins import CreateNotice
from playbot.users.models import User


class CancelReasons(models.Model):
    name = models.CharField(_("Reason"), max_length=150, unique=True)

    class Meta:
        verbose_name = "Cancel Reason"
        verbose_name_plural = "Cancel Reasons"

    def __str__(self):
        return f"{self.name}"


class Duration(models.Model):
    name = models.CharField(_("Label"), max_length=150)
    duration = models.IntegerField(_("Duration"))

    class Meta:
        ordering = ["duration",]
        verbose_name = "Duration"
        verbose_name_plural = "Durations"

    def __str__(self):
        return f"{self.name}"


class Format(models.Model):
    name = models.CharField(_("Label"), max_length=150)
    count = models.IntegerField(_("Count In Team"))
    rate = models.FloatField(_("Rate For Rank"), default=1)

    class Meta:
        verbose_name = "Format"
        verbose_name_plural = "Formats"

    def __str__(self):
        return f"{self.name}"


class DistributionMethod(models.Model):
    name = models.CharField(_("Method"), max_length=150, unique=True)

    class Meta:
        verbose_name = "Distribution Method"
        verbose_name_plural = "Distribution Methods"

    def __str__(self):
        return f"{self.name}"


class CountCircles(models.Model):
    name = models.CharField(_("Label"), max_length=150)
    count = models.IntegerField(_("Count Of Circles"))

    class Meta:
        verbose_name = "Count Circles"
        verbose_name_plural = "Count Circles"

    def __str__(self):
        return f"{self.name}"


class Event(models.Model, CreateNotice):
    name = models.CharField(_("Name"), max_length=150)
    date = models.DateField(_("Date Of Game"))
    time_begin = models.TimeField(_("Time Begin"))
    time_end = models.TimeField(_("Time End"), blank=True, null=True)
    count_players = models.IntegerField(_("Count Of Players"))
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="event", blank=True, null=True)
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name="events", blank=True, null=True)
    cancel = models.BooleanField(_("Cancel"), default=False)
    cancel_reasons = models.ForeignKey(CancelReasons, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    format = models.ForeignKey(Format, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    distribution_method = models.ForeignKey(DistributionMethod, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    notice = models.TextField(_("Notice"), blank=True, null=True)
    is_player = models.BooleanField(_("Is Organizer Play"), default=False)
    organizers = models.ManyToManyField(User, related_name="events_organizer", blank=True)
    count_circles = models.ForeignKey(CountCircles, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    duration = models.ForeignKey(Duration, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    scorer = models.BooleanField(_("Is Scorer of Goal"), default=False)
    until_goal = models.BooleanField(_("Play Until Goal"), default=False)
    until_goal_count = models.IntegerField(_("Count of Goal Until Play"), blank=True, null=True)
    format_label = models.ForeignKey(Format, on_delete=models.SET_NULL, related_name="event_labels", blank=True, null=True)
    is_paid = models.BooleanField(_("Is Paid"), default=False)
    price = models.FloatField(_("Price"), default=0)
    currency = models.CharField(_("Currency"), max_length=50, default="RUB")
    duration_opt = models.ForeignKey(Duration, on_delete=models.SET_NULL, related_name="events_opt", blank=True, null=True)
    is_news_line = models.BooleanField(_("Is Public in News Lina"), default=False)
    public_in_channel = models.ForeignKey("telegram.TelegramChannel", on_delete=models.SET_NULL, blank=True, null=True)
    publish_time = models.DateTimeField(_("Time of Delayed Publishing"), blank=True, null=True)
    genders = models.ManyToManyField("users.Gender", related_name="event_genders", blank=True)
    min_age = models.PositiveIntegerField(_("Min Age"), default=0)
    max_age = models.PositiveIntegerField(_("Max Age"), default=0)
    min_players_rank = models.PositiveIntegerField(_("Min Players Rank"), default=0)
    max_players_rank = models.PositiveIntegerField(_("Max Players Rank"), default=0)
    announce = models.OneToOneField("telegram.Announce", on_delete=models.CASCADE, related_name="event", blank=True, null=True)

    class Meta:
        ordering = ["date", "time_begin"]
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return f"{self.name}"

    @property
    def next_number(self):
        if self.teams.all().exists():
            last_number = self.teams.all().order_by("-number").first().number
            return last_number + 1
        else:
            return 1

    @property
    def next_queue_number(self):
        if self.event_queues.all().exists():
            last_number = self.event_queues.all().order_by("-number").first().number
            return last_number + 1
        else:
            return 1

    @property
    def first_order_queue(self):
        user = None
        if self.event_queues.all().exists():
            user = self.event_queues.all().order_by("number").first().player
        return user

    @property
    def rank(self):
        players = self.event_player.all()
        rank = 0
        if players.count():
            rank = sum([player.player.rank for player in players])
            rank /= players.count()
            rank = round(rank, 2)
        return int(rank)

    @property
    def rank_fact(self):
        players = self.event_player.all()
        rank = 0
        if players.count():
            rank = sum([player.player.rank_fact for player in players])
            rank /= players.count()
            rank = round(rank, 2)
        return rank

    @property
    def is_end(self):
        is_end = bool(self.time_end)
        if not is_end:
            if self.event_games.exists() and self.event_games.all().count() == self.event_games.all().exclude(time_end=None).count():
                is_end = True
        if not is_end and not self.event_games.exclude(time_begin=None).exists():
            time_begin = datetime.datetime(year=self.date.year, month=self.date.month, day=self.date.day,
                                           hour=self.time_begin.hour, minute=self.time_begin.minute, tzinfo=timezone.now().tzinfo)
            if (time_begin + datetime.timedelta(minutes=90)).timestamp() < timezone.now().timestamp():
                is_end = True
        if not is_end and self.event_games.filter(time_end=None).exists():
            last_time = self.event_games.filter(time_end=None).first().last_active_time()
            if last_time and (last_time + datetime.timedelta(minutes=90)).timestamp() < timezone.now().timestamp():
                is_end = True
        if not is_end and self.event_games.exclude(time_begin=None, time_end=None).exists():
            last_time = self.event_games.exclude(time_begin=None, time_end=None).last().last_active_time()
            if last_time and (last_time + datetime.timedelta(minutes=90)).timestamp() < timezone.now().timestamp():
                is_end = True

        return is_end

    @property
    def is_begin(self):
        is_begin = False
        if self.event_games.exists():
            if self.event_games.all().first().time_begin:
                is_begin = True
        return is_begin

    @property
    def all_games_finished(self):
        return self.event_games.all().count() == self.event_games.exclude(time_end=None).count()

    @property
    def current_game_id(self):
        if self.event_games.filter(time_end=None).exists():
            return self.event_games.filter(time_end=None).first().id
        else:
            return self.event_games.all().last().id

    @property
    def count_current_players(self):
        return self.event_player.all().count()

    @property
    def is_delay_publish(self):
        return bool(self.publish_time)

    @property
    def status(self):
        status = _("waiting to start")
        if self.is_begin and not self.is_end:
            status = _("started")
        if self.is_end:
            status = _("completed")
        if self.cancel:
            status = _("cancelled")
        return status


class Color(models.Model):
    color = models.CharField(_("Color"), max_length=50, unique=True)
    color_hex = models.CharField(_("Color Hex"), max_length=50)

    class Meta:
        verbose_name = "Color"
        verbose_name_plural = "Colors"

    def __str__(self):
        return f"{self.color}"


class Team(models.Model):
    name = models.CharField(_("Name"), max_length=150)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="teams")
    count_players = models.IntegerField(_("Count Of Players"))
    number = models.IntegerField(_("Team Number"), default=1)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, related_name="teams", blank=True, null=True)

    class Meta:
        unique_together = ["name", "event"]
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        return f"{self.name} - {self.event.name}"

    @property
    def wins(self):
        wins = 0
        for game in self.event_games_teams_1.all():
            if game.time_end and game.score_1 > game.score_2:
                wins += 1
        for game in self.event_games_teams_2.all():
            if game.time_end and game.score_2 > game.score_1:
                wins += 1
        return wins

    @property
    def loss(self):
        loss = 0
        for game in self.event_games_teams_1.all():
            if game.time_end and game.score_1 < game.score_2:
                loss += 1
        for game in self.event_games_teams_2.all():
            if game.time_end and game.score_2 < game.score_1:
                loss += 1
        return loss

    @property
    def nothing(self):
        nothing = 0
        for game in self.event_games_teams_1.all():
            if game.time_end and game.score_1 == game.score_2:
                nothing += 1
        for game in self.event_games_teams_2.all():
            if game.time_end and game.score_2 == game.score_1:
                nothing += 1
        return nothing

    @property
    def played(self):
        played = 0
        for game in self.event_games_teams_1.all():
            if game.time_end:
                played += 1
        for game in self.event_games_teams_2.all():
            if game.time_end:
                played += 1
        return played

    @property
    def rank(self):
        rank = 0
        for player in self.team_players.all():
            rank += player.player.rank
        rank /= self.team_players.all().count()
        return int(rank)

    @property
    def all_rivals(self):
        users_id = []
        for event_game in self.event_games_teams_1.all():
            if event_game.current_duration:
                users_id += list(event_game.team_2.team_players.all().values_list("player_id", flat=True))
        for event_game in self.event_games_teams_2.all():
            if event_game.current_duration:
                users_id += list(event_game.team_1.team_players.all().values_list("player_id", flat=True))
        return len(set(users_id))

    @property
    def scores(self):
        return self.wins * 3 + self.nothing

    @property
    def do_goals(self):
        goals_1 = [team.score_1 for team in self.event_games_teams_1.all()]
        goals_2 = [team.score_2 for team in self.event_games_teams_2.all()]
        return sum(goals_1 + goals_2)

    @property
    def miss_goals(self):
        goals_1 = [team.score_2 for team in self.event_games_teams_1.all()]
        goals_2 = [team.score_1 for team in self.event_games_teams_2.all()]
        return sum(goals_1 + goals_2)


class EventPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="event_player")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_player")

    class Meta:
        ordering = ["event__date", "event__time_begin"]
        unique_together = ["player", "event"]
        verbose_name = "Event Player"
        verbose_name_plural = "Events Players"

    def __str__(self):
        return f"{self.player.username} - {self.event.name}"

    def get_team(self):
        team_players = self.player.team_players.filter(team__event=self.event)
        if team_players.exists():
            return team_players.first().team

    @property
    def played(self):
        played = 0
        team = self.get_team()
        if team:
            played = team.played
        return played

    @property
    def wins(self):
        wins = 0
        team = self.get_team()
        if team:
            wins = team.wins
        return wins

    @property
    def do_goals(self):
        do_goals = 0
        team = self.get_team()
        if team:
            do_goals = Goal.objects.filter(player=self.player, team=team).count()
        return do_goals

    @property
    def do_assist(self):
        do_assist = 0
        team = self.get_team()
        if team:
            do_assist = Goal.objects.filter(assistant=self.player, team=team).count()
        return do_assist

    @property
    def delta_rank(self):
        delta_rank = 0
        getting_ranks = self.player.ranks_history.filter(event=self.event)
        if getting_ranks.exists():
            rank = getting_ranks.first()
            last_rank = self.player.ranks_history.filter(create__lt=rank.create).last()
            delta_rank = rank.rank - last_rank.rank
        return int(delta_rank * 100)


class EventQueue(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="event_queues")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_queues")
    number = models.PositiveIntegerField(_("Number"), default=1)

    class Meta:
        unique_together = [["player", "event"], ["number", "event"]]
        verbose_name = "Event Queue"
        verbose_name_plural = "Events Queues"

    def __str__(self):
        return f"{self.player.username} - {self.event.name}"


class PlayerNumber(models.Model):
    number = models.PositiveIntegerField(_("Number"), unique=True)

    class Meta:
        verbose_name = "Player Number"
        verbose_name_plural = "Player Numbers"

    def __str__(self):
        return f"{self.number}"


class TeamPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="team_players")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team_players")
    number = models.ForeignKey(PlayerNumber, on_delete=models.CASCADE, related_name="team_players", blank=True, null=True)

    class Meta:
        unique_together = [["player", "team"], ["number", "team"]]
        verbose_name = "Team Player"
        verbose_name_plural = "Teams Players"

    def __str__(self):
        return f"{self.player.name} - {self.team.name}"

    @property
    def do_goals(self):
        return Goal.objects.filter(player=self.player, team=self.team).count()

    @property
    def do_assist(self):
        return Goal.objects.filter(assistant=self.player, team=self.team).count()

    @property
    def delta_rank(self):
        delta_rank = 0
        getting_ranks = self.player.ranks_history.filter(event=self.team.event)
        if getting_ranks.exists():
            rank = getting_ranks.first()
            last_rank = self.player.ranks_history.filter(create__lt=rank.create).last()
            delta_rank = rank.rank - last_rank.rank
        return int(delta_rank * 100)


class EventGame(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_games")
    team_1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="event_games_teams_1")
    team_2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="event_games_teams_2")
    time_begin = models.TimeField(_("Time Begin"), blank=True, null=True)
    time_end = models.TimeField(_("Time End"), blank=True, null=True)
    number = models.IntegerField(_("Number"), default=1)

    class Meta:
        verbose_name = "Event Game"
        verbose_name_plural = "Event Games"
        ordering = ["number",]

    def __str__(self):
        return f"{self.event.name} - {self.number}"

    @property
    def current_duration(self):
        duration = 0
        for period in self.game_periods.all():
            duration += period.duration
        return int(duration)

    @property
    def current_duration_without_last(self):
        duration = 0
        for period in self.game_periods.exclude(time_end=None):
            duration += period.duration
        return int(duration)

    @property
    def last_time_begin(self):
        if self.game_periods.filter(time_end=None).exclude(time_begin=None).exists():
            return self.game_periods.filter(time_end=None).exclude(time_begin=None).last().time_begin

    @property
    def rest_time(self):
        rest_time = self.event.duration.duration * 60 - self.current_duration
        return rest_time if rest_time > 0 else 0

    @property
    def is_play(self):
        return self.game_periods.filter(time_end=None).exists()

    @property
    def score_1(self):
        return self.goals.filter(team=self.team_1).count()

    @property
    def score_2(self):
        return self.goals.filter(team=self.team_2).count()

    @property
    def result_1(self):
        result = 0.5
        if self.score_1 > self.score_2:
            result = 1
        elif self.score_1 < self.score_2:
            result = -1
        return result

    @property
    def result_2(self):
        result = 0.5
        if self.score_2 > self.score_1:
            result = 1
        elif self.score_2 < self.score_1:
            result = -1
        return result

    def last_active_time(self):
        time = None
        for period in self.game_periods.all():
            if period.time_begin:
                time = period.time_begin
            if period.time_end:
                time = period.time_end
        return time


class EventStep(models.Model):
    class StepName(models.TextChoices):
        STEP_1 = "Step 1", _("Step 1")
        STEP_2 = "Step 2", _("Step 2")
        STEP_3 = "Step 3", _("Step 3")

    step = models.CharField(_("Step Name"), max_length=50, choices=StepName.choices, default=StepName.STEP_1)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_step")
    complete = models.BooleanField(_("Step Is Complete"), default=False)

    class Meta:
        ordering = ["id",]
        unique_together = ["step", "event"]
        verbose_name = "Event Step"
        verbose_name_plural = "Events Steps"

    def __str__(self):
        return f"{self.event.name} - {self.step}"


class Goal(models.Model):
    game = models.ForeignKey(EventGame, on_delete=models.CASCADE, related_name="goals")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="goals")
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="goals", blank=True, null=True)
    time = models.DateTimeField(_("Goal Time"), default=timezone.now)
    game_time = models.FloatField(_("Game Time"))
    auto = models.BooleanField(_("Is Auto Goal"), default=False)
    assistant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assistant_goals", blank=True, null=True)

    class Meta:
        ordering = ["time",]
        unique_together = ["game", "time"]
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    def __str__(self):
        return f"{self.game.event.name} - {self.team.name}"

    @property
    def score_my(self):
        goals = self.game.goals.filter(time__lte=self.time)
        return goals.filter(team=self.team).count()

    @property
    def score_other(self):
        goals = self.game.goals.filter(time__lte=self.time)
        return goals.exclude(team=self.team).count()


class GamePeriod(models.Model):
    game = models.ForeignKey(EventGame, on_delete=models.CASCADE, related_name="game_periods")
    time_begin = models.DateTimeField(_("Time Begin"), default=timezone.now)
    time_end = models.DateTimeField(_("Time End"), blank=True, null=True)

    class Meta:
        ordering = ["time_begin",]
        unique_together = [["game", "time_begin"], ["game", "time_end"]]
        verbose_name = "Game Period"
        verbose_name_plural = "Game Periods"

    def __str__(self):
        return f"{self.game.event.name} - {self.time_begin}"

    @property
    def duration(self):
        duration = (timezone.now() - self.time_begin).total_seconds()
        if self.time_end:
            duration = (self.time_end - self.time_begin).total_seconds()
        return duration
