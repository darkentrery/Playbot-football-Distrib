from django.urls import path

from playbot.notices import views


urlpatterns = [
    path('hidde-notice/', views.HiddeUserNoticeView.as_view(), name='hidde-notice'),
    path('create-subscription/', views.CreateSubscriptionView.as_view(), name='create-subscription'),
]