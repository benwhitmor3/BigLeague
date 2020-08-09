from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class League(models.Model):
    league_name = models.CharField(max_length=25, primary_key=True)
    # add user??


class Franchise(models.Model):
    franchise = models.CharField(max_length=25, primary_key=True)
    owner = models.ForeignKey(
        User, related_name="Owner", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.franchise


class City(models.Model):
    city = models.CharField(max_length=20, primary_key=True)
    city_value = models.IntegerField()

    def __str__(self):
        return self.city


class Stadium(models.Model):
    stadium_name = models.CharField(max_length=20, primary_key=True)
    stadium_seats = models.IntegerField(blank=True, null=True)
    stadium_boxes = models.IntegerField(blank=True, null=True)
    stadium_grade = models.IntegerField(blank=True, null=True)
    stadium_max_grade = models.IntegerField(blank=True, null=True)
    home_field_advantage = models.IntegerField(blank=True, null=True)
    franchise = models.OneToOneField(Franchise, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.stadium_name


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
    franchise = models.CharField(max_length=25, blank=True, null=True)
    lineup = models.CharField(max_length=10, blank=True, null=True)
    trainer = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class GM(models.Model):
    trait = models.CharField(max_length=50)
    franchise = models.CharField(max_length=25, blank=True, null=True)

    def __str__(self):
        return self.trait


class Coach(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    attribute1 = models.CharField(max_length=25)
    attribute2 = models.CharField(max_length=25)
    franchise = models.CharField(max_length=25, blank=True, null=True)

    def __str__(self):
        return self.name


class Actions(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE)
    improved_bathrooms = models.BooleanField(default=False)
    improved_concessions = models.BooleanField(default=False)
    jumbotron = models.BooleanField(default=False)
    upscale_bar = models.BooleanField(default=False)
    hall_of_fame = models.BooleanField(default=False)
    improved_seating = models.BooleanField(default=False)
    improved_sound = models.BooleanField(default=False)
    party_deck = models.BooleanField(default=False)
    wi_fi = models.BooleanField(default=False)
    fan_night = models.BooleanField(default=False)
    family_game = models.BooleanField(default=False)
    door_prizes = models.BooleanField(default=False)
    mvp_night = models.BooleanField(default=False)
    parade_of_champions = models.BooleanField(default=False)
    bribe_the_refs = models.BooleanField(default=False)
    easy_runs = models.BooleanField(default=False)
    fan_factor = models.BooleanField(default=False)
    train_player = models.BooleanField(default=False)
    farm_system = models.BooleanField(default=False)
    fan_favourites = models.BooleanField(default=False)
    gourmet_restaurant = models.BooleanField(default=False)
    beer_garden = models.BooleanField(default=False)
    naming_rights = models.BooleanField(default=False)
    event_planning = models.BooleanField(default=False)


class Season(models.Model):
    season = models.IntegerField()
    wins = models.IntegerField()
    losses = models.IntegerField()
    ppg = models.FloatField()
    std = models.FloatField()
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE)

    def __str__(self):
        return self.season
