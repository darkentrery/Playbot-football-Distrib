import os
import time

import django
from loguru import logger


@logger.catch
def main() -> None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
    django.setup()

    from scripts.recalculate import recalculate

    while True:
        recalculate()
        time.sleep(600)


if __name__ == "__main__":
    main()
