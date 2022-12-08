from django.db import models
from django.utils.translation import gettext_lazy as _
# from django.contrib.gis.db import models
from playbot.cities.models import City
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
        verbose_name = "Duration"
        verbose_name_plural = "Durations"

    def __str__(self):
        return f"{self.name}"


class Format(models.Model):
    name = models.CharField(_("Label"), max_length=150)
    count = models.IntegerField(_("Count In Team"))

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
    address = models.CharField(_("Address"), max_length=150)
    # geo = models.PointField(_("Geo Points"))
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

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return f"{self.name}"


class Team(models.Model):
    name = models.CharField(_("Name"), max_length=150)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="team")
    count_players = models.IntegerField(_("Count Of Players"))

    class Meta:
        unique_together = ["name", "event"]
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        return f"{self.name} - {self.event.name}"


class EventPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="event_player")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_player")

    class Meta:
        unique_together = ["player", "event"]
        verbose_name = "Event Player"
        verbose_name_plural = "Events Players"

    def __str__(self):
        return f"{self.player.username} - {self.event.name}"


class TeamPlayer(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name="team_player")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team_player")

    class Meta:
        unique_together = ["player", "team"]
        verbose_name = "Team Player"
        verbose_name_plural = "Teams Players"

    def __str__(self):
        return f"{self.player.name} - {self.team.name}"


class EventStep(models.Model):
    class StepName(models.TextChoices):
        STEP_1 = "Step 1", _("Step 1")
        STEP_2 = "Step 2", _("Step 2")
        STEP_3 = "Step 3", _("Step 3")

    step = models.CharField(_("Step Name"), max_length=50, choices=StepName.choices, default=StepName.STEP_1)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_step")
    complete = models.BooleanField(_("Step Is Complete"), default=False)

    class Meta:
        unique_together = ["step", "event"]
        verbose_name = "Event Step"
        verbose_name_plural = "Events Steps"

    def __str__(self):
        return f"{self.event.name} - {self.step}"



