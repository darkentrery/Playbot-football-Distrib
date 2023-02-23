from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('auth/', include('social_django.urls', namespace='social')),
    path('', include('playbot.users.urls')),
    path('api/events/', include('playbot.events.urls')),
    path('api/cities/', include('playbot.cities.urls')),
    path('api/notices/', include('playbot.notices.urls')),
    path('webpush/', include('webpush.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
