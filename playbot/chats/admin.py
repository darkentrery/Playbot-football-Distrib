from django.contrib import admin

from playbot.chats.models import Chat, Message


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = [
        "event",
    ]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "chat",
        "from_user",
        "content",
        "timestamp",
        "read",
    ]
