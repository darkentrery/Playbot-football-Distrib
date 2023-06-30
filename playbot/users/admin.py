import re

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from webpush import send_user_notification

from playbot.cities.models import Address
from playbot.users.forms import UserCustomForm
from playbot.users.models import User, Position, RankHistory, UserRivals, Gender, PhotoError


class RankHistoryInline(admin.TabularInline):
    model = RankHistory
    extra = 0
    list_display = [
        "rank",
        "create",
    ]


class UserRivalsInline(admin.TabularInline):
    model = UserRivals
    extra = 0
    fk_name = "from_user"
    list_display = [
        "to_user",
        "event",
    ]


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = UserCustomForm
    list_display = [
        "email",
        "username",
        "phone_number",
        "telegram_id",
        "is_superuser",
        "is_active",
        "gender",
        "position_1",
        "is_organizer",
    ]
    list_display_links = list_display

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
                    "address",
                    "confirm_slug",
                    "gender",
                    "birthday",
                    "position_1",
                    "position_2",
                    "penalty",
                    "involvement",
                    "photo",
                    "big_card_photo",
                    "small_card_photo",
                    "overlay_photo",
                    "about_self",
                    "favorite_events",
                    "favorite_players",
                    "first_login",
                    "is_accept_photo",
                    "photo_errors",
                )
            },
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_organizer",
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
        "favorite_players",
        "photo_errors",
        # "rivals",
    )
    inlines = [RankHistoryInline, UserRivalsInline]
    actions = ["set_first_rank", "send_notification", "set_default_address", "change_gender", "cut_username"]

    @admin.action()
    def set_first_rank(self, request, queryset):
        for user in User.objects.all():
            if not user.ranks_history.all().exists():
                RankHistory.objects.create(user=user)

    @admin.action()
    def send_notification(self, request, queryset):
        for user in queryset:
            payload = {'head': "head", 'body': "body"}
            send_user_notification(user=user, payload=payload, ttl=1000)

    @admin.action()
    def set_default_address(self, request, queryset):
        for user in queryset:
            user.address = Address.objects.all().first()
            user.save()

    @admin.action()
    def change_gender(self, request, queryset):
        for user in queryset:
            if user.gender == "Муж.":
                user.gender = User.Gender.MALE
                user.save()
            if user.gender == "Жен.":
                user.gender = User.Gender.FEMALE
                user.save()

    @admin.action()
    def cut_username(self, request, queryset):
        for user in queryset:
            username = re.sub(r'@[^@]*', "", user.username)
            cut_name = self.get_new_username(username)
            user.username = cut_name
            user.save()

    def get_new_username(self, username):
        len_username = len(username) if len(username) <= 12 else 12
        if User.objects.filter(username=username[:len_username]).exists():
            username = username[:len_username] + "1"
            return self.get_new_username(username)
        else:
            return username[:len_username]


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "acronym",
    ]


@admin.register(RankHistory)
class RankHistoryAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "rank",
        "create",
        "update",
        "event",
    ]


@admin.register(UserRivals)
class UserRivalsAdmin(admin.ModelAdmin):
    list_display = [
        "from_user",
        "to_user",
        "event",
    ]


@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
    ]


@admin.register(PhotoError)
class PhotoErrorAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
    ]

