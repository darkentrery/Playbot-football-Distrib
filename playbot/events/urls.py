from django.urls import path, re_path

from playbot.events import views


urlpatterns = [
    path("create/", views.CreateEventView.as_view(), name='create-event'),
    path("get-events/", views.EventsView.as_view(), name='events'),
    path("get-event/<int:id>/", views.EventView.as_view(), name='event'),
    path("edit/", views.EditEventView.as_view(), name='edit-event'),
    path("get-cancel-reasons/", views.CancelReasonsView.as_view(), name='cancel-reasons'),
    path("event-players/<int:id>/", views.EventPlayersView.as_view(), name='event-players'),
]