from django.db import IntegrityError, transaction
from .models import *
import random
from random import gauss
from .player_coach_names import PLAYER_NAMES, COACH_NAMES


def gen_franchise(league, num_of_franchises=7):
    """generates franchises and stadiums based on list of names"""
    franchise_names = [
        "Aces", "All Stars", "Avengers", "Aztecs", "Big Blues", "Big Red", "Blazers", "Cyclones", "Devils", "Dragons",
        "Dream", "Dynamo", "Flames", "Flash", "Force", "Fury", "Golden Bears", "Groove", "Heatwave", "Hurricanes",
        "Icons", "Jam", "Legends", "Lightning", "Masters", "Mavericks", "Monarchy", "Pioneers", "Pride", "Racers",
        "Rebels", "Renegades", "Riptide", "Royals", "Soul", "Spartans", "Spirit", "Storm", "Strikers",
        "Trojans", "United", "Violets", "Voodoo", "Warriors", "Wild", "Zephyrs"
    ]
    franchise_list = random.sample(franchise_names, k=num_of_franchises)
    cities = City.objects.filter(league=league)

    franchises = []
    stadiums = []
    for franchise_name in franchise_list:
        franchise = Franchise(franchise=franchise_name, league=league)
        franchises.append(franchise)
        stadium = Stadium(
            stadium_name=franchise_name + ' stadium',
            seats=random.randint(30000, 100000),
            boxes=random.randint(150, 750),
            grade=20,
            max_grade=20,
            home_field_advantage=0,
            city=random.choice(cities),
            franchise=franchise
        )
        stadiums.append(stadium)

    Franchise.objects.bulk_create(franchises)
    Stadium.objects.bulk_create(stadiums)

    franchises = Franchise.objects.filter(league=league)
    seasons = [Season(franchise=franchise, season=1, fan_index=70) for franchise in franchises]
    actions = [Action(franchise=franchise) for franchise in franchises]

    Season.objects.bulk_create(seasons)
    Action.objects.bulk_create(actions)

    return "Successfully created " + str(num_of_franchises) + " franchises"


def gen_city(league, num_of_cities=8):
    """Generates cities based on a list of cities and city values."""
    cities = [
        "Los Angeles", "New York", "London", "Chicago", "San Francisco", "Washington", "Phoenix", "Indianapolis",
        "Philadelphia", "Houston", "Dallas", "Denver", "Boston", "Las Vegas", "Seattle",
        "Atlanta", "Miami", "Toronto", "Vancouver", "Detroit"
    ]
    values = [5, 6, 7, 8, 9, 10, 11, 12]

    cities_list = random.sample(cities, k=num_of_cities)
    city_objects = [City(city=city, city_value=random.choice(values), league=league) for city in cities_list]

    City.objects.bulk_create(city_objects)


def gen_player(league, num_of_players=50, rookies=True):
    """generates players with age determined by rookie criteria"""
    for _ in range(num_of_players):

        if rookies:
            age = random.randint(18, 22)
        else:
            age = random.randint(18, 30)

        suit = random.choices(['heart', 'spade', 'club', 'diamond'], weights=[15, 18, 15, 12], k=1)[0]

        sd = 3
        # create player value
        if suit == "heart":
            pv = gauss(15, sd)
        elif suit == "spade":
            pv = gauss(18, sd)
        elif suit == "club":
            pv = gauss(16, sd)
        elif suit == "diamond":
            pv = gauss(17, sd)
        # create estimated player value
        epv = pv + gauss(0, sd)
        # create scouter estimated player value
        sd = 2
        s_epv = pv + gauss(0, sd)

        # generate a unique name for the player
        while True:
            first_name, last_name = random.choice(PLAYER_NAMES)
            try:
                with transaction.atomic():
                    Player.objects.create(
                        name=f"{first_name} {last_name}",
                        suit=suit,
                        age=age,
                        pv=pv,
                        epv=epv,
                        s_epv=s_epv,
                        year=1,
                        league=league
                    )
                    break  # Break the loop if the player was created successfully
            except IntegrityError:
                continue  # Retry with a new name if IntegrityError occurs


def gen_gm(league):
    """Generates general managers with traits"""
    traits = ['facilitator', 'promoter', 'recruiter', 'scouter', 'suitor', 'trainer']
    GM.objects.bulk_create([GM(trait=trait, league=league) for trait in traits])


def gen_coach(league, num_of_coaches=10):
    """generates coaches with two attributes"""
    for _ in range(num_of_coaches):
        # coaches can have double teamwork or fame traits
        attributes = random.sample(['teamwork', 'teamwork', 'clutch', 'fame', 'fame',
                                    'focus', 'guts', 'substitution', 'underdog', 'road'], k=2)
        while True:
            first_name, last_name = random.choice(COACH_NAMES)
            try:
                with transaction.atomic():
                    Coach.objects.create(name=f"{first_name} {last_name}",
                                         attribute_one=attributes[0], attribute_two=attributes[1], league=league)
                    break  # Break the loop if the coach was created successfully
            except IntegrityError:
                continue  # Retry with a new name if IntegrityError occurs
