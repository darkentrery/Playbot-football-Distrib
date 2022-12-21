from django.contrib import admin

from playbot.events.models import Event, CancelReasons, Team, EventPlayer, TeamPlayer, EventStep, Duration, Format, \
    DistributionMethod, CountCircles, EventGame


class TeamInline(admin.TabularInline):
    model = Team
    extra = 0
    list_display = [
        "name",
        "count_players",
    ]


class EventPlayerInline(admin.TabularInline):
    model = EventPlayer
    extra = 0
    list_display = [
        "player",
    ]


class TeamPlayerInline(admin.TabularInline):
    model = TeamPlayer
    extra = 0
    list_display = [
        "player",
    ]


class EventStepInline(admin.TabularInline):
    model = EventStep
    extra = 0
    list_display = [
        "step",
        "complete",
    ]


class EventGameInline(admin.TabularInline):
    model = EventGame
    extra = 0
    list_display = [
        "number",
        "team_1",
        "score_1",
        "team_2",
        "score_2",
        "time_begin",
        "time_end",
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
        EventStepInline,
        EventGameInline,
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


@admin.register(EventStep)
class EventStepAdmin(admin.ModelAdmin):
    list_display = [
        "step",
        "event",
        "complete",
    ]


@admin.register(Duration)
class DurationAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "duration",
    ]
    actions = ["set_times",]

    @admin.action()
    def set_times(self, request, queryset):
        for i in range(1, 91):
            if str(i)[-1] == "1" and i != 11:
                Duration.objects.create(name=f"{i} минута", duration=i)
            elif str(i)[-1] in ("2", "3", "4") and not (i in (12, 13, 14)):
                Duration.objects.create(name=f"{i} минуты", duration=i)
            else:
                Duration.objects.create(name=f"{i} минут", duration=i)


@admin.register(Format)
class FormatAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "count",
    ]


@admin.register(DistributionMethod)
class DistributionMethodAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(CountCircles)
class CountCirclesAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "count",
    ]


@admin.register(EventGame)
class EventGameAdmin(admin.ModelAdmin):
    list_display = [
        "number",
        "team_1",
        "score_1",
        "team_2",
        "score_2",
        "time_begin",
        "time_end",
    ]
