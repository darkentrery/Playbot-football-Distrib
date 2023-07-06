import os
import time

import django
from loguru import logger


@logger.catch
def main() -> None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
    django.setup()

    from scripts.recalculate import recalculate
    from scripts.test import send_photo_for_moderation

    send_photo_for_moderation()

    while True:
        recalculate()
        time.sleep(600)


if __name__ == "__main__":
    main()
