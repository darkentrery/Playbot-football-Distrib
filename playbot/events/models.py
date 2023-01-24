from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
# from django.contrib.gis.db import models
from playbot.cities.models import City, Address
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


class Event(models.Model):
    name = models.CharField(_("Name"), max_length=150)
    date = models.DateField(_("Date Of Game"))
    time_begin = models.TimeField(_("Time Begin"))
    time_end = models.TimeField(_("Time End"), blank=True, null=True)
    count_players = models.IntegerField(_("Count Of Players"))
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="event", blank=True, null=True)
    geo_point = models.CharField(_("Geo Point"), max_length=50, blank=True, null=True)
    cancel = models.BooleanField(_("Cancel"), default=False)
    cancel_reasons = models.ForeignKey(CancelReasons, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    format = models.ForeignKey(Format, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    distribution_method = models.ForeignKey(DistributionMethod, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    notice = models.TextField(_("Notice"), blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="event", blank=True, null=True)
    is_player = models.BooleanField(_("Is Organizer Play"), default=False)
    organizer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    count_circles = models.ForeignKey(CountCircles, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    duration = models.ForeignKey(Duration, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    scorer = models.BooleanField(_("Is Scorer of Goal"), default=False)
    until_goal = models.BooleanField(_("Play Until Goal"), default=False)
    until_goal_count = models.IntegerField(_("Count of Goal Until Play"), blank=True, null=True)
    format_label = models.ForeignKey(Format, on_delete=models.SET_NULL, related_name="event_labels", blank=True, null=True)
    is_paid = models.BooleanField(_("Is Paid"), default=False)
    price = models.FloatField(_("Price"), default=0)
    currency = models.CharField(_("Currency"), max_length=50, default="RUB")

    class Meta:
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


class Team(models.Model):
    name = models.CharField(_("Name"), max_length=150)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="teams")
    count_players = models.IntegerField(_("Count Of Players"))
    number = models.IntegerField(_("Team Number"), default=1)

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


class EventPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="event_player")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_player")

    class Meta:
        unique_together = ["player", "event"]
        verbose_name = "Event Player"
        verbose_name_plural = "Events Players"

    def __str__(self):
        return f"{self.player.username} - {self.event.name}"


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


class TeamPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="team_players")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team_players")

    class Meta:
        unique_together = ["player", "team"]
        verbose_name = "Team Player"
        verbose_name_plural = "Teams Players"

    def __str__(self):
        return f"{self.player.name} - {self.team.name}"


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

    class Meta:
        ordering = ["time",]
        unique_together = ["game", "time"]
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    def __str__(self):
        return f"{self.game.event.name} - {self.team.name}"


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
        return int(duration)






