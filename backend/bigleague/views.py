from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LeadSerializer, PlayergenerationSerializer, GMSerializer, CitySerializer
from .models import Lead, Playergeneration, GM, City


# Create your views here.
class LeadView(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class PlayergenerationView(viewsets.ModelViewSet):
    queryset = Playergeneration.objects.all()
    serializer_class = PlayergenerationSerializer

class GMView(viewsets.ModelViewSet):
    queryset = GM.objects.all()
    serializer_class = GMSerializer

class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

