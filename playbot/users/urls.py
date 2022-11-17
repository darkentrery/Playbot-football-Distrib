from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from playbot.users import views

urlpatterns = [
    path("", views.IndexView.as_view(), name='index'),
    path("login/", views.IndexView.as_view(), name='index'),
    path("sign-up/", views.IndexView.as_view(), name='index'),
    re_path(r"^api/login/$", views.LoginView.as_view(), name='login'),
    re_path(r"^api/telegram-login/$", views.LoginTelegramView.as_view(), name='telegram-login'),
    re_path(r"^api/sign-up/$", views.SignUpView.as_view(), name='sign-up'),
    re_path(r"^api/refresh-password/$", views.RefreshPasswordView.as_view(), name='refresh-password'),
    re_path(r"^api/telegram-sign-up/$", views.SignUpTelegramView.as_view(), name='telegram-sign-up'),
    path("api/update-city/", views.UpdateCityView.as_view(), name='update-city'),
    path('api/token/obtain/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("confirm-sign-up/<slug>/", views.ConfirmSignUpView.as_view(), name='confirm-sign-up'),
    path('sw.js', views.ServiceWorkerView.as_view(), name=views.ServiceWorkerView.name),
    re_path(r"^api/data/$", views.DataView.as_view(), name='data'),
    re_path(r"^api/valid-token/$", views.ValidView.as_view(), name='valid-token'),
]