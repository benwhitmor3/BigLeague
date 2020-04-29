from rest_framework import serializers
from .models import Lead, Playergeneration, City, GM

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'message']

class PlayergenerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playergeneration
        fields = ['id', 'name', 'suit', 'age', 'pv', 'epv',
                  'contract', 't_option', 'p_option', 'renew',
                  'salary', 'grade', 'team']

class GMSerializer(serializers.ModelSerializer):
    class Meta:
        model = GM
        fields = ['id', 'gm']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'city', 'city_value']
