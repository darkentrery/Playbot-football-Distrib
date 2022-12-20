import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.prodaction')

django_asgi_app = get_asgi_application()

from playbot.chats.middlewares import TokenAuthMiddleware

from config import routing  # noqa isort:skip

from channels.routing import ProtocolTypeRouter, URLRouter

# application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": TokenAuthMiddleware(URLRouter(routing.websocket_urlpatterns)),
    }
)
