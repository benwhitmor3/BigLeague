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

    def get_queryset(self):
        query = self.request.GET.get('q')

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {'request': self.request}


class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

