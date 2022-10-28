from django.urls import path

from playbot.users import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sw.js', views.ServiceWorkerView.as_view(), name=views.ServiceWorkerView.name,)
]