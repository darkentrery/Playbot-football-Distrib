from django.urls import path

from playbot.events import views


urlpatterns = [
    path("create/", views.CreateEventView.as_view(), name='create-event'),
    path("get-events/", views.EventsView.as_view(), name='events'),
    path("get-event/<int:id>/", views.EventView.as_view(), name='event'),
    path("edit/", views.EditEventView.as_view(), name='edit-event'),
    path("cancel-event/", views.CancelEventView.as_view(), name='cancel-event'),
    path("get-cancel-reasons/", views.CancelReasonsView.as_view(), name='cancel-reasons'),
    path("to-confirm-players/", views.ToConfirmPlayersView.as_view(), name='to-confirm-players'),
    path("confirm-players/", views.ConfirmPlayersView.as_view(), name='confirm-players'),
    path("get-regulation/<int:id>/", views.GetRegulationView.as_view(), name='get-regulation'),
    path("set-regulation/", views.SetRegulationView.as_view(), name='set-regulation'),
    path("join-player/", views.JoinPlayerView.as_view(), name='join-player'),
    path("leave-event/", views.LeaveEventView.as_view(), name='leave-event'),
]