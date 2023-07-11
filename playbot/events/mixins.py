from aiogram import Bot
from asgiref.sync import async_to_sync, sync_to_async
from django.conf import settings
from loguru import logger
from webpush import send_user_notification

from playbot.notices.models import UserNotice, Notice


bot = Bot(token=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN)
number_emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",]


def get_emoji_number(number: int) -> str:
    result = ""
    for i in str(number):
        result += number_emojis[int(i)]
    return result


class CreateNotice:
    def notice_not_places_in_event(self, user):
        notice = Notice.objects.create(
            notice_type=Notice.Type.WARNING,
            text="Все места заняты. Вы можете попасть в лист ожидания. Если кто-то не сможет прийти на игру с вами свяжутся.",
            event=self
        )
        UserNotice.objects.create(user=user, notice=notice)

    def notice_cancel_event(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.CANCEL_EVENT,
            text=f"Игра {self.name} была отменена",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)
            payload = {
                "head": "Игра отменена!",
                "body": notice.text,
                "action_url": f"{settings.CONFIRM_REGISTRATION_DOMAIN}/events/event/{self.id}/",
            }
            send_user_notification(user=player.player, payload=payload, ttl=1000)

    def notice_new_player(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.NEW_PLAYER,
            text=f"В игру {self.name} добавился новый участник",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)
            payload = {
                "head": "Добавился новый участник!",
                "body": notice.text,
                "action_url": f"{settings.CONFIRM_REGISTRATION_DOMAIN}/events/event/{self.id}/",
            }
            send_user_notification(user=player.player, payload=payload, ttl=1000)

    def notice_complete_players(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.COMPLETE_PLAYERS,
            text=f"Игра  {self.name} набрала {self.count_players} из {self.count_players} участников.",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)

    @logger.catch
    def notice_join_to_event(self, user):
        notice = Notice.objects.create(
            notice_type=Notice.Type.JOIN,
            text=f"Вы успешно присоединились к игре",
            event=self
        )
        UserNotice.objects.create(user=user, notice=notice)

        if user.telegram_id:
            for admin in self.organizers.all():
                UserNotice.objects.create(user=admin, notice=notice)
                if admin.telegram_id:
                    self.notice_join_to_event_tg(user, admin.telegram_id)

    @logger.catch
    def notice_leave_event(self, user):
        notice = Notice.objects.create(
            notice_type=Notice.Type.LEAVE,
            text=f"Вы покинули игру",
            event=self
        )
        UserNotice.objects.create(user=user, notice=notice)

        if user.telegram_id:
            message = self.message_for_leave_notice(user)
            for admin in self.organizers.all():
                UserNotice.objects.create(user=admin, notice=notice)
                if admin.telegram_id:
                    self.notice_leave_event_tg(admin.telegram_id, message)
            if self.event_queues.all().count() > 0 and self.announce:
                self.notice_leave_event_tg(self.announce.channel.channel_id, message)

    @async_to_sync
    async def notice_join_to_event_tg(self, user, channel_id) -> None:
        text = f'❕ {user} joined the event "{self.id}"'
        await bot.send_message(channel_id, text, parse_mode="html")

    @async_to_sync
    async def notice_leave_event_tg(self, channel_id, message) -> None:
        await bot.send_message(channel_id, message)

    def message_for_leave_notice(self, user) -> str:
        number = get_emoji_number(self.id)
        chat_notification = f"🚪 {user} left event {number}\n"
        last_queue_user = self.last_joined_player
        if last_queue_user:
            chat_notification += f"{last_queue_user} is now in the game.\n"

        joined_players = self.count_current_players
        chat_notification += f"👥 Players: <b>{joined_players}/{self.format.count}</b>\n"

        players_in_queue = self.event_queues.all().count()
        if players_in_queue > 0:
            chat_notification += f"Players in queue: <b>{players_in_queue}</b>"

        return chat_notification
