from django.db import models
from django.utils.translation import gettext_lazy as _


class TelegramChannel(models.Model):
    name = models.CharField(_("Name"), max_length=150, unique=True)
    admin = models.ForeignKey("users.User", on_delete=models.SET_NULL, related_name="telegram_channels_admin", blank=True, null=True)

    class Meta:
        verbose_name = "Telegram Channel"
        verbose_name_plural = "Telegram Channels"

    def __str__(self):
        return f"{self.name}"
