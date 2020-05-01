from django.db import models
from django.urls import reverse
from django_pandas.io import read_frame

from rest_framework.reverse import reverse as api_reverse


# Create your models here.
class Cities(models.Model):
    city = models.CharField(max_length=50, primary_key=True)
    city_value = models.IntegerField()

    def __str__(self):
        return self.city


class Teams(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    stadium_seats = models.IntegerField(blank=True, null=True)
    stadium_boxes = models.IntegerField(blank=True, null=True)
    stadium_grade = models.IntegerField(blank=True, null=True)
    stadium_max_grade = models.IntegerField(blank=True, null=True)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Players(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    suit = models.CharField(max_length=10)
    age = models.IntegerField()
    pv = models.FloatField()
    epv = models.FloatField()
    s_epv = models.FloatField()
    contract = models.IntegerField(blank=True, null=True)
    t_option = models.IntegerField(blank=True, null=True)
    p_option = models.IntegerField(blank=True, null=True)
    renew = models.CharField(max_length=10, blank=True)
    salary = models.FloatField(blank=True, null=True)
    grade = models.FloatField(blank=True, null=True)
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GMs(models.Model):
    trait = models.CharField(max_length=50, primary_key=True)
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return self.trait


class Coaches(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    attribute1 = models.CharField(max_length=25)
    attribute2 = models.CharField(max_length=25)
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Seasons(models.Model):
    season = models.IntegerField(primary_key=True)
    wins = models.IntegerField()
    losses = models.IntegerField()
    ppg = models.FloatField()
    std = models.FloatField()
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return self.season
