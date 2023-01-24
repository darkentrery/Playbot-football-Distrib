from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from playbot.users.models import User, Position, RankHistory


class RankHistoryInline(admin.TabularInline):
    model = RankHistory
    extra = 0
    list_display = [
        "rank",
        "create",
    ]


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = [
        "email",
        "username",
        "phone_number",
        "telegram_id",
        "is_superuser",
        "is_active",
    ]

    fieldsets = (
        (
            ("Personal info"),
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                    "telegram_id",
                    "city",
                    "confirm_slug",
                    "gender",
                    "birthday",
                    "position_1",
                    "position_2",
                    "penalty",
                    "involvement",
                    "photo",
                    "about_self",
                    "favorite_events",
                )
            },
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    filter_horizontal = (
        "groups",
        "user_permissions",
        "favorite_events",
    )
    inlines = [RankHistoryInline,]


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(RankHistory)
class RankHistoryAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "rank",
        "create",
    ]