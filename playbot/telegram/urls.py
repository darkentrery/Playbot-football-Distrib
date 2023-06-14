from django.urls import path


from playbot.telegram import views

urlpatterns = [
    path("get-channels/", views.GetChannelsView.as_view(), name='get-channels'),
    path("get-channels/<int:id>/", views.GetChannelsByAdminView.as_view(), name='get-channels-by-admin'),
]