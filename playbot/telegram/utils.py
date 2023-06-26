import pathlib
from io import BytesIO

from aiogram import Bot, types
from asgiref.sync import async_to_sync, sync_to_async
from django.conf import settings
from loguru import logger

from django.utils.translation import gettext_lazy as _

from playbot.events.models import Event
from playbot.telegram.models import Announce, TelegramChannel
from playbot.users.models import User

bot = Bot(token=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN)


number_emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",]


def get_message_for_announce(event: Event) -> str:
    message = ""
    cost = "free" if not event.is_paid else event.price

    percent = event.count_current_players / event.count_players * 100
    player_count_emoji = "🟢"
    if percent > 50:
        player_count_emoji = "🟡"
    if percent > 79:
        player_count_emoji = "🔴"

    message += _(
        f"🆔 {event.id}, <b>{event.status}</b>\n"
        f"🏷️ {event.name}\n"
        f"🕒 {event.date.strftime('%d.%m')} - {event.time_begin.strftime('%H:%M')}\n"
        f"🏟 {event.field}, {event.format if event.format else ''}\n"
        f"{player_count_emoji} {event.count_current_players}/{event.count_players}, <b>💰{cost}</b>\n"
        f"👨‍⚖️ Host: {event.organizers.all()[0].username}\n"
    )

    if event.count_current_players:
        message += "\n" + _("<u>👬 Participants:</u>") + "\n"
        for player in event.event_player.all():
            # messageResult += ply.getHTMLMention() + ply.getStanceAbbr(comma=True) + "\n"
            message += player.player.username + player.player.acronym_positions + "\n"

    if event.event_queues.count():
        message += "\n" + _("<u>👥 Wait list:</u>") + "\n"
        for player in event.event_queues.all():
            # messageResult += f"{misc.emojizeNumbers(counter)} {ply.getHTMLMention()}{ply.getStanceAbbr(comma=True)}\n"
            message += f"{number_emojis[player.number]} {player.player.username}{player.player.acronym_positions}\n"

    # leftPlayers = await self.getLeftUsers()
    #
    # if len(leftPlayers) > 0:
    #     messageResult += "\n" + _("<u>🚪 Left</u>") + "\n"
    #     for ply in leftPlayers:  # Дописываем вышедших
    #         messageResult += f"{ply.getHTMLMention()}{ply.getStanceAbbr(comma=True)}\n"

    return message


# def get_buttons():
#     kb = types.InlineKeyboardMarkup()
#     if len(joinedPlayers) >= self.maxPlayers:
#         kb.add(types.InlineKeyboardButton(_("✚ Wait list"), callback_data=f"chatEventJoinQueue_{self.id}"))
#     else:
#         kb.add(types.InlineKeyboardButton(_("✚ Join"), callback_data=f"chatEventJoin_{self.id}"))
#
#     kb.row(
#         types.InlineKeyboardButton(_("🚪 Leave"), callback_data=f"chatEventLeave_{self.id}")
#     )


@async_to_sync
async def send_announce(channel: TelegramChannel, event: Event) -> Announce:
    try:
        bot_is_member = await bot.get_chat_member(chat_id=channel.channel_id, user_id=bot.id)
        if bot_is_member.status == "administrator":
            text = await sync_to_async(lambda: get_message_for_announce(event))()
            message = await bot.send_message(channel.channel_id, text, parse_mode="html")
            announce, _ = await sync_to_async(lambda: Announce.objects.get_or_create(message_id=message.message_id, channel=channel))()
            return announce
        if bot_is_member.status in ["left", "kicked"]:
            logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    except Exception as e:
        logger.debug(f"Bot {bot.id} {e}")


@logger.catch
@async_to_sync
async def update_announce(event: Event) -> None:
    channel_id = await sync_to_async(lambda: event.announce.channel.channel_id)()
    message_id = await sync_to_async(lambda: event.announce.message_id)()
    try:
        bot_is_member = await bot.get_chat_member(chat_id=channel_id, user_id=bot.id)
        if bot_is_member.status == "administrator":
            text = await sync_to_async(lambda: get_message_for_announce(event))()
            await bot.edit_message_text(text=text, chat_id=channel_id, message_id=message_id, parse_mode="html")
        if bot_is_member.status in ["left", "kicked"]:
            logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    except Exception as e:
        logger.debug(f"Bot {bot.id} {e}")


@logger.catch
@async_to_sync
async def send_photo_for_moderation(user: User) -> None:
    try:
        with open(user.photo.path, "rb") as photo:
            img = BytesIO(photo.read())
            img.name = "card.png"
            kb = types.InlineKeyboardMarkup()
            kb.row(types.InlineKeyboardButton("✅ Одобрить", callback_data=f"playerAvatarVerify_{user.id}"))
            kb.row(types.InlineKeyboardButton("❌ Отклонить", callback_data=f"playerAvatarDecline_{user.id}"))
            for moderation in settings.TELEGRAM_MODERATOR_ID:
                bot_is_member = await bot.get_chat_member(chat_id=moderation, user_id=bot.id)
                if bot_is_member.status in ["administrator", "member"]:
                    await bot.send_document(chat_id=moderation, document=img, reply_markup=kb)

                if bot_is_member.status in ["left", "kicked"]:
                    logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    except Exception as e:
        logger.debug(f"Bot {bot.id} {e}")
