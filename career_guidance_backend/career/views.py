from django.shortcuts import render
from rest_framework import viewsets
from .models import Career
from .serializers import CareerSerializer
from .permissions import IsAdminOrReadOnly


# Create your views here.

from rest_framework.permissions import IsAuthenticated

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    permission_classes = [IsAuthenticated]  # Any logged-in user can create/update/delete
