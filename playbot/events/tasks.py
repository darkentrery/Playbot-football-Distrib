import time

from celery import shared_task
from django.utils import timezone
from loguru import logger

from playbot.events.models import Event
from playbot.telegram.utils import update_or_create_announce


@shared_task()
@logger.catch
def send_announce_task(event_id: int) -> None:
    event = Event.objects.get(id=event_id)
    if not event.announce and event.publish_time:
        delay = (event.publish_time - timezone.now()).total_seconds()
        time.sleep(delay)
        update_or_create_announce(event)
    else:
        update_or_create_announce(event)
