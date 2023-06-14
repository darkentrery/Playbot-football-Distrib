from aiogram import Bot
from asgiref.sync import async_to_sync, sync_to_async
from django.conf import settings
from loguru import logger

from playbot.telegram.models import Announce, TelegramChannel

bot = Bot(token=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN)


@async_to_sync
async def send_announce(channel: TelegramChannel, text: str) -> Announce:
    try:
        bot_is_member = await bot.get_chat_member(chat_id=channel.channel_id, user_id=bot.id)
        if bot_is_member.status == "administrator":
            message = await bot.send_message(channel.channel_id, text)
            announce, _ = await sync_to_async(lambda: Announce.objects.get_or_create(message_id=message.message_id, channel=channel))()
            return announce
        if bot_is_member.status in ["left", "kicked"]:
            logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    except Exception as e:
        logger.debug(f"Bot {bot.id} {e}")


@async_to_sync
async def update_announce(announce: Announce, text: str) -> None:
    channel_id = await sync_to_async(lambda: announce.channel.channel_id)()
    try:
        bot_is_member = await bot.get_chat_member(chat_id=channel_id, user_id=bot.id)
        if bot_is_member.status == "administrator":
            await bot.edit_message_text(text=text, chat_id=channel_id, message_id=announce.message_id)
        if bot_is_member.status in ["left", "kicked"]:
            logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    except Exception as e:
        logger.debug(f"Bot {bot.id} {e}")
