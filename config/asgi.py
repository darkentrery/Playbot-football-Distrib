import os

from django.core.asgi import get_asgi_application

from playbot.chats.middlewares import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.prodaction')

from config import routing  # noqa isort:skip

from channels.routing import ProtocolTypeRouter, URLRouter

# application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleware(URLRouter(routing.websocket_urlpatterns)),
    }
)
