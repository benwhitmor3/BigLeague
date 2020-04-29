from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LeadSerializer, PlayergenerationSerializer, CitySerializer
from .models import Lead, Playergeneration, City


# Create your views here.
class LeadView(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class PlayergenerationView(viewsets.ModelViewSet):
    queryset = Playergeneration.objects.all()
    serializer_class = PlayergenerationSerializer

class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

