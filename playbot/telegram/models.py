from django.db import models
from django.utils.translation import gettext_lazy as _


class TelegramChannel(models.Model):
    name = models.CharField(_("Name"), max_length=150, unique=True)
    admins = models.ManyToManyField("users.User", related_name="telegram_channels_admin", blank=True)
    channel_id = models.CharField(_("Channel Id"), max_length=150, unique=True)
    has_bot = models.BooleanField(_("Channel Has Bot"), default=False)

    class Meta:
        verbose_name = "Telegram Channel"
        verbose_name_plural = "Telegram Channels"

    def __str__(self):
        return f"{self.name}"


class Announce(models.Model):
    message_id = models.CharField(_("Message Id"), max_length=50)
    channel = models.ForeignKey("telegram.TelegramChannel", on_delete=models.CASCADE, related_name="announces")

    class Meta:
        unique_together = ["message_id", "channel"]
        verbose_name = "Announce"
        verbose_name_plural = "Announces"

    def __str__(self):
        return f"{self.channel.name} - {self.message_id}"
