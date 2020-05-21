from rest_framework import serializers
from .models import Franchise, City, Stadium, Player, GM, Coach, Season


class FranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franchise
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class GMSerializer(serializers.ModelSerializer):
    class Meta:
        model = GM
        fields = '__all__'


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = '__all__'