from django.contrib import admin

from playbot.telegram.models import TelegramChannel


@admin.register(TelegramChannel)
class TelegramChannelAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "admin",
    ]
