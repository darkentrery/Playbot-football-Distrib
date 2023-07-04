from django.db import models
from django.utils.translation import gettext_lazy as _


class UserEventAction(models.Model):
    class Actions(models.TextChoices):
        JOIN = "Join To Event", _("Join To Event")
        LEAVE = "Leave Event", _("Leave Event")
        CREATE = "Create Event", _("Create Event")
        CANCEL = "Cancel Event", _("Cancel Event")

    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="users_events_actions")
    event = models.ForeignKey("events.Event", on_delete=models.CASCADE, related_name="users_events_actions")
    action_time = models.DateTimeField(_("Action Time"), auto_now_add=True)
    action = models.CharField(_("Action Name"), max_length=50, choices=Actions.choices, default=Actions.JOIN)
    reason = models.ForeignKey("events.CancelReasons", on_delete=models.CASCADE, related_name="users_events_actions", blank=True, null=True)

    class Meta:
        verbose_name = "User Event Action"
        verbose_name_plural = "User Event Actions"

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"
