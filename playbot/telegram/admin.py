from django.contrib import admin

from playbot.telegram.models import TelegramChannel, Announce


@admin.register(TelegramChannel)
class TelegramChannelAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "has_bot",
    ]
    filter_horizontal = [
        "admins",
    ]


@admin.register(Announce)
class AnnounceAdmin(admin.ModelAdmin):
    list_display = [
        "message_id",
        "channel",
    ]
