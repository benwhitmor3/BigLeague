from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Owner(models.Model):
    team = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    owner = models.ForeignKey(
        User, related_name="Owner", on_delete=models.CASCADE, null=True)


class City(models.Model):
    city = models.CharField(max_length=50, primary_key=True)
    city_value = models.IntegerField()

    def __str__(self):
        return self.city


class Stadium(models.Model):
    stadium_seats = models.IntegerField(blank=True, null=True)
    stadium_boxes = models.IntegerField(blank=True, null=True)
    stadium_grade = models.IntegerField(blank=True, null=True)
    stadium_max_grade = models.IntegerField(blank=True, null=True)
    team = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Player(models.Model):
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
    team = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GM(models.Model):
    trait = models.CharField(max_length=50, primary_key=True)
    team = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.trait


class Coach(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    attribute1 = models.CharField(max_length=25)
    attribute2 = models.CharField(max_length=25)
    team = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Season(models.Model):
    season = models.IntegerField(primary_key=True)
    wins = models.IntegerField()
    losses = models.IntegerField()
    ppg = models.FloatField()
    std = models.FloatField()
    team = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.season
