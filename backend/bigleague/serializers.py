from rest_framework import serializers
from .models import Owner, City, Stadium, Player, GM, Coach, Season


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['city', 'city_value']


class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = ['stadium_seats', 'stadium_boxes',
                  'stadium_grade', 'stadium_max_grade', 'team']


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['name', 'suit', 'age', 'pv', 'epv', 's_epv',
                  'contract', 't_option', 'p_option', 'renew',
                  'salary', 'grade', 'team']


class GMSerializer(serializers.ModelSerializer):
    class Meta:
        model = GM
        fields = ['trait', 'team']


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ['name', 'attribute1', 'attribute2']


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ['season', 'wins', 'losses', 'ppg', 'std', 'team']