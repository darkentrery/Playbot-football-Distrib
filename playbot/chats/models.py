from django.db import models

from django.utils.translation import gettext_lazy as _

from playbot.events.models import Event
from playbot.users.models import User


class Chat(models.Model):
    online = models.ManyToManyField(to=User, blank=True, related_name="chats")
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name="chats")

    class Meta:
        verbose_name = "Chat"
        verbose_name_plural = "Chats"

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    def __str__(self):
        return f"{self.event.name} ({self.get_online_count()})"


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages_from_me")
    # to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages_to_me")
    content = models.TextField(_("Content"))
    timestamp = models.DateTimeField(_("Message Time"), auto_now_add=True)
    read = models.BooleanField(_("Message Is Read"), default=False)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"

    def __str__(self):
        return f"From {self.from_user.username}: {self.content} [{self.timestamp}]"
