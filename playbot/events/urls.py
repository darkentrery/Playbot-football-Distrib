from django.urls import path, re_path

from playbot.events import views


urlpatterns = [
    path("create/", views.CreateEventView.as_view(), name='create-event'),
]