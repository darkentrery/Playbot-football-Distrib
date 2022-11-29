from django.contrib import admin

from playbot.events.models import Event, CancelReasons, Team, EventPlayer, TeamPlayer


class TeamInline(admin.TabularInline):
    model = Team
    extra = 0
    readonly_fields = [
        "name",
        "count_players",
    ]


class EventPlayerInline(admin.TabularInline):
    model = EventPlayer
    extra = 0
    readonly_fields = [
        "player",
    ]


class TeamPlayerInline(admin.TabularInline):
    model = TeamPlayer
    extra = 0
    readonly_fields = [
        "player",
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
        EventPlayerInline,
    ]


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "event",
        "count_players",
    ]
    inlines = [TeamPlayerInline,]


@admin.register(EventPlayer)
class EventPlayerAdmin(admin.ModelAdmin):
    list_display = [
        "player",
        "event",
    ]


@admin.register(TeamPlayer)
class TeamPlayerAdmin(admin.ModelAdmin):
    list_display = [
        "player",
        "team",
    ]
