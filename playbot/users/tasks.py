# from celery import shared_task
# from loguru import logger
#
# from playbot.telegram.utils import send_photo_for_moderation
# from playbot.users.models import User


# @shared_task()
# @logger.catch
# def send_photo_to_moderation_task(user_id: int) -> None:
#     user = User.objects.get(id=user_id)
#     send_photo_for_moderation(user)
