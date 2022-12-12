from django.contrib import admin

from playbot.history.models import UserEventAction


@admin.register(UserEventAction)
class UserEventActionAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "event",
        "action_time",
        "action",
        "reason",
    ]
