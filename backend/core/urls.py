from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('test/', views.test_api, name='test_api'),
    path('health/', views.health_check, name='health_check'),
    path('api/services/', views.get_services, name='get_services'),
    path('api/courses/', views.get_courses, name='get_courses'),
]
