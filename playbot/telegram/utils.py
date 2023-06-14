from aiogram import Bot
from asgiref.sync import async_to_sync
from django.conf import settings


bot = Bot(token=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN)


@async_to_sync
async def send_announce(channel_id: str, text: str):
    await bot.send_message(channel_id, text)
