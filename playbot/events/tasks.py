import datetime
import time

from celery import shared_task
from loguru import logger

from playbot.events.models import Event
from playbot.telegram.utils import update_or_create_announce


@shared_task()
@logger.catch
def send_announce_task(event: Event) -> None:
    if event.publish_time:
        delay = (event.publish_time - datetime.datetime.utcnow()).total_seconds()
        time.sleep(delay)
        update_or_create_announce(event)
    else:
        update_or_create_announce(event)
