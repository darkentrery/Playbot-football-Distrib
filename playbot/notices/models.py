from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from playbot.events.models import Event
from playbot.users.models import User


class Notice(models.Model):
    class Type(models.TextChoices):
        WARNING = "Warning", _("Warning")
        CRITICAL = "Critical", _("Critical")
        NEW_PLAYER = "New Player", _("New Player")
        INVITE = "Invite", _("Invite")
        COMPLETE_PLAYERS = "Complete Players", _("Complete Players")
        CANCEL_EVENT = "Cancel Event", _("Cancel Event")
        JOIN = "Join", _("Join")
        REGARD = "Regard", _("Regard")

    notice_type = models.CharField(_("Notice Type"), max_length=150, choices=Type.choices, default=Type.WARNING)
    text = models.TextField(_("Notice Text"))
    for_all = models.BooleanField(_("For All Users"), default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="notices", blank=True, null=True)
    create = models.DateTimeField(_("Time Create"), default=timezone.now)

    class Meta:
        verbose_name = "Notice"
        verbose_name_plural = "Notices"

    def __str__(self):
        return f"{self.notice_type}"


class UserNotice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notices", blank=True)
    notice = models.ForeignKey(Notice, on_delete=models.CASCADE, related_name="user_notices", blank=True)
    time_read = models.DateTimeField(_("Time Read"), blank=True, null=True)

    class Meta:
        verbose_name = "User Notice"
        verbose_name_plural = "User Notices"

    def __str__(self):
        return f"{self.user.username} - {self.notice.notice_type}"

    @property
    def is_read(self):
        return self.time_read is not None
