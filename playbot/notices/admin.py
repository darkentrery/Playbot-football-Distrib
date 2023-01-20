from django.contrib import admin

from playbot.notices.models import Notice, UserNotice


class UserNoticeInline(admin.TabularInline):
    model = UserNotice
    extra = 0
    list_display = [
        "user",
        "time_read",
    ]


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = [
        "notice_type",
        "text",
        "for_all",
        "event",
        "create",
    ]
    inlines = [UserNoticeInline,]


@admin.register(UserNotice)
class UserNoticeAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "notice",
        "time_read",
    ]
