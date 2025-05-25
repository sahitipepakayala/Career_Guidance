from django.http import HttpResponse
from django.urls import path, include
from rest_framework import routers
from .views import CareerViewSet

router = routers.DefaultRouter()
router.register('', CareerViewSet)

urlpatterns = [
                  # or path('', home_view) if you want it at root
    path('', include(router.urls)),        # keep API at root (e.g., /)
]
