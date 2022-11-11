from django.db import models
from django.utils.translation import gettext_lazy as _
# from django.contrib.gis.db import models
from playbot.cities.models import City


class CancelReasons(models.Model):
    name = models.CharField(_("Reason"), max_length=150)

    class Meta:
        verbose_name = "Cancel Reason"
        verbose_name_plural = "Cancel Reasons"

    def __str__(self):
        return f"{self.name}"


class Event(models.Model):
    class Format(models.TextChoices):
        FIVE = "5x5", _("5x5")
        SIX = "6x6", _("6x6")
        SEVEN = "7x7", _("7x7")
        EIGHT = "8x8", _("8x8")
        NINE = "9x9", _("9x9")
        TEN = "10x10", _("10x10")
        ELEVEN = "11x11", _("11x11")


    name = models.CharField(_("Name"), max_length=150)
    date = models.DateField(_("Date Of Game"))
    time_begin = models.TimeField(_("Time Begin"))
    time_end = models.TimeField(_("Time End"), blank=True, null=True)
    count_players = models.IntegerField(_("Count Of Players"))
    address = models.CharField(_("Address"), max_length=150)
    # geo = models.PointField(_("Geo Points"))
    cancel = models.BooleanField(_("Cancel"), default=False)
    cancel_reasons = models.ForeignKey(CancelReasons, on_delete=models.SET_NULL, related_name="event", blank=True, null=True)
    format = models.CharField(_("Format"), max_length=50, choices=Format.choices, default=Format.FIVE, blank=True, null=True)
    notice = models.TextField(_("Notice"), blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="event", blank=True, null=True)

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
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        return f"{self.name} - {self.event.name}"



