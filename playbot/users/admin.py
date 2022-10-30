from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from playbot.users.models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = [
        "email",
        "is_superuser",
    ]

    fieldsets = (
        (
            ("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                    "telegram_id"
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