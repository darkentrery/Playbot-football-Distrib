from django.contrib import admin

from playbot.events.models import Event, CancelReasons, Team, City


class TeamInline(admin.TabularInline):
    model = Team
    extra = 0
    readonly_fields = [
        "name",
        "event",
        "count_players",
    ]


@admin.register(CancelReasons)
class CancelReasonsAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "date",
        "time_begin",
        "time_end",
        "count_players",
        "address",
        # "geo",
        "cancel",
        "cancel_reasons",
        "format",
    ]
    inlines = [
        TeamInline,
    ]


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "event",
        "count_players",
    ]


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]
