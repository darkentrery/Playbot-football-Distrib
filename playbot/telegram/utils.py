import asyncio
import datetime
import time
from io import BytesIO
from typing import Coroutine

from aiogram import Bot, types
from asgiref.sync import async_to_sync, sync_to_async
from django.conf import settings
from loguru import logger

from django.utils.translation import gettext_lazy as _
from playwright.async_api import async_playwright

from playbot.events.models import Event
from playbot.history.models import UserEventAction
from playbot.telegram.models import Announce, TelegramChannel
from playbot.users.models import User

bot = Bot(token=settings.SOCIAL_AUTH_TELEGRAM_BOT_TOKEN)


number_emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",]


async def do_web_page_screenshot(urls: list | str, loop: asyncio.BaseEventLoop = None, width: int = 300, height: int = 300,
                        selector: str = None, callAfter: Coroutine = None, args: tuple | list = ()) -> list[bytes] | None:
    """
        `urls`: str|list
            Ссылка или ссылки на странцы, скриншот которых требуется сделать
        `loop`: asyncio.BaseEventLoop
            asyncio event loop
        `width`: int
            Ширина видимой области (px)
        `height`: int
            Высота видимой области (px)
            (Можно не указывать, так как playwright всё равно заскринит по всей высоте)
        `selector`: str
            Селектор для требуемого элемента.
            Если не указан, то заскринит страницу целиком.
        `callAfter`: Coroutine
            Метод, который будет вызван сразу после готовности всех скриншотов.
            Если указан, то список со скринами будет передан первым параметром при вызове этого метода.
            Если не указан, то список со скринами будет возвращён.
        `args`: tuple|list
            Будут переданы в callAfter
    """

    if isinstance(urls, str):
        urls = [urls]
    async with async_playwright() as playwright:
        chromium = playwright.chromium
        browser = await chromium.launch()
        results = []
        for url in urls:
            page = await browser.new_page()
            await page.set_viewport_size({"width": width, "height": height})
            await page.goto(url)
            await page.wait_for_load_state()
            time.sleep(2)
            if selector is None:
                scr = await page.screenshot(omit_background=True)
            else:
                scr = page.locator(selector).screenshot(omit_background=True)
            results.append(scr)
            await page.close()

        await browser.close()
        return results


@sync_to_async
def get_message_for_announce(event: Event) -> str:
    message = ""
    cost = "free" if not event.is_paid else f"{event.price} {event.currency}"

    percent = event.count_current_players / event.count_players * 100
    player_count_emoji = "🟢"
    if percent > 50:
        player_count_emoji = "🟡"
    if percent > 79:
        player_count_emoji = "🔴"

    local_time_begin = event.datetime_begin + datetime.timedelta(minutes=event.field.timezone)

    message += _(
        f"🕒 {local_time_begin.strftime('%A, %d.%m')} {local_time_begin.strftime('%H:%M')} (id {event.id})\n"
        f"🏟 {event.field}, {event.field.address.s_h_string}, {event.field.format}\n"
        f"{player_count_emoji} {event.count_current_players}/{event.count_players}, <b>💰{cost}</b>\n"
    )

    if event.notice:
        message += f"🖊 {event.notice}\n"

    if event.count_current_players:
        message += "\n" + _("<u>👬 Participants:</u>") + "\n"
        for player in event.event_player.all():
            # messageResult += ply.getHTMLMention() + ply.getStanceAbbr(comma=True) + "\n"
            position = f", {player.player.acronym_position}" if player.player.acronym_position else ""
            message += f"{player.player.username}{position}\n"

    if event.event_queues.count():
        message += "\n" + _("<u>👥 Wait list:</u>") + "\n"
        number = 1
        for player in event.event_queues.all():
            # messageResult += f"{misc.emojizeNumbers(counter)} {ply.getHTMLMention()}{ply.getStanceAbbr(comma=True)}\n"
            position = f", {player.player.acronym_position}" if player.player.acronym_position else ""
            message += f"{number_emojis[number]} {player.player.username}{position}\n"
            number += 1

    exists_users = list(event.event_player.all().values_list("player__id", flat=True)) + list(event.event_queues.all().values_list("player__id", flat=True))
    exists_users = list(set(exists_users))
    leave_actions = event.users_events_actions.filter(action=UserEventAction.Actions.LEAVE).exclude(user__id__in=exists_users).distinct("user__id")
    # leave_actions = leave_actions.order_by("action_time")
    if leave_actions.count():
        message += "\n" + _("<u>🚪 Left:</u>") + "\n"
        for action in leave_actions:
            position = f", {action.user.acronym_position}" if action.user.acronym_position else ""
            message += f"{action.user.username}{position}\n"

    return message


@sync_to_async
def get_buttons(event: Event):
    kb = types.InlineKeyboardMarkup()
    if event.event_player.all().count() >= event.count_players:
        kb.row(types.InlineKeyboardButton("✚ Wait list", callback_data=f"chatEventJoinQueue_{event.id}"))
    else:
        kb.row(types.InlineKeyboardButton("✚ Join", callback_data=f"chatEventJoin_{event.id}"))

    kb.row(types.InlineKeyboardButton("🚪 Leave", callback_data=f"chatEventLeave_{event.id}"))
    return kb


@logger.catch
@async_to_sync
async def send_announce(channel: TelegramChannel, event: Event) -> Announce:
    # try:
    bot_is_member = await bot.get_chat_member(chat_id=channel.channel_id, user_id=bot.id)
    if bot_is_member.status in ["administrator", "member"]:
        text = await get_message_for_announce(event)
        buttons = await get_buttons(event)
        message = await bot.send_message(channel.channel_id, text, parse_mode="html", reply_markup=buttons)
        announce, create = await sync_to_async(lambda: Announce.objects.get_or_create(message_id=message.message_id, channel=channel))()
        return announce
    if bot_is_member.status in ["left", "kicked"]:
        logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    # except Exception as e:
    #     logger.debug(f"Bot {bot.id} {e}")


@logger.catch
@async_to_sync
async def update_announce(event: Event) -> None:
    channel_id = await sync_to_async(lambda: event.announce.channel.channel_id)()
    message_id = await sync_to_async(lambda: event.announce.message_id)()
    # try:
    bot_is_member = await bot.get_chat_member(chat_id=channel_id, user_id=bot.id)
    if bot_is_member.status in ["administrator", "member"]:
        buttons = await get_buttons(event)
        text = await get_message_for_announce(event)
        await bot.edit_message_text(text=text, chat_id=channel_id, message_id=message_id, parse_mode="html", reply_markup=buttons)
    if bot_is_member.status in ["left", "kicked"]:
        logger.debug(f"Bot {bot.id} {bot_is_member.status=}")
    # except Exception as e:
    #     logger.debug(f"Bot {bot.id} {e}")


@logger.catch
@async_to_sync
async def send_photo_for_moderation(user: User) -> None:
    # try:
    for moderation in settings.TELEGRAM_MODERATOR_ID:
        bot_is_member = await bot.get_chat_member(chat_id=moderation, user_id=bot.id)
        logger.info(f"{bot_is_member.status=}, {moderation=}")

        if bot_is_member.status in ["administrator", "member"]:
            # with open(user.photo.path, "rb") as photo:
            #     img = BytesIO(photo.read())
            #     img.name = "card.png"
            img = await do_web_page_screenshot(urls="https://pbxbot.korobkaplay.ru/getPlayerCardPic?userID=1&all=1&unverified=1")
            img = BytesIO(img[0])
            img.name = 'card.png'
            kb = types.InlineKeyboardMarkup()
            kb.row(types.InlineKeyboardButton("✅ Одобрить", callback_data=f"playerAvatarVerify_{user.id}"))
            kb.row(types.InlineKeyboardButton("❌ Отклонить", callback_data=f"playerAvatarDecline_{user.id}"))
            await bot.send_document(chat_id=moderation, document=img, reply_markup=kb)
            logger.info(f"Success for {moderation=}")

        if bot_is_member.status in ["left", "kicked"]:
            logger.debug(f"Bot {bot.id} {bot_is_member.status=}, {moderation=}")
    # except Exception as e:
    #     logger.debug(f"Bot {bot.id} {e}")


@logger.catch
@async_to_sync
async def delete_announce(event: Event) -> None:
    channel_id = await sync_to_async(lambda: event.announce.channel.channel_id)()
    message_id = await sync_to_async(lambda: event.announce.message_id)()

    bot_is_member = await bot.get_chat_member(chat_id=channel_id, user_id=bot.id)
    if bot_is_member.status in ["administrator", "member"]:
        await bot.delete_message(channel_id, message_id)
        await sync_to_async(lambda: Announce.objects.get(message_id=message_id, channel_id=channel_id).delete())()
    if bot_is_member.status in ["left", "kicked"]:
        logger.debug(f"Bot {bot.id} {bot_is_member.status=}")


def update_or_create_announce(event: Event) -> None:
    if event.announce:
        update_announce(event)
    elif not event.announce and event.public_in_channel:
        logger.info(f"Published {event.id=} in {event.public_in_channel.channel_id=}")
        announce = send_announce(event.public_in_channel, event)
        event.announce = announce
        event.save()
