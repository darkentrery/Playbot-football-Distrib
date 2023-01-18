from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from playbot.users.models import User, Position


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
                    "rank",
                    "birthday",
                    "position_1",
                    "position_2",
                    "photo",
                    "about_self",
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


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]