from django.db import IntegrityError, transaction
from .models import *
import random
from random import gauss
from .generated_names import PLAYER_NAMES, COACH_NAMES, FRANCHISE_NAMES


def gen_franchise(league: League, num_of_franchises: int) -> str:
    """generates franchises and stadiums based on list of names"""
    franchise_list = random.sample(FRANCHISE_NAMES, k=num_of_franchises)
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

    franchises = Franchise.objects.filter(league=league)  # re-query to add user franchise
    seasons = [Season(franchise=franchise, season=1, fan_index=70) for franchise in franchises]
    actions = [Action(franchise=franchise) for franchise in franchises]

    Season.objects.bulk_create(seasons)
    Action.objects.bulk_create(actions)

    return "Successfully created " + str(num_of_franchises) + " franchises"


def gen_city(league: League, num_of_cities: int) -> str:
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

    return "Successfully created " + str(len(cities_list)) + " cities"


def gen_player(league: League, num_of_players: int, rookies: bool) -> str:
    """generates players with age determined by rookie criteria"""
    for _ in range(num_of_players):

        if rookies:
            age = random.randint(18, 22)
        else:
            age = random.randint(18, 30)

        suit = random.choices(['heart', 'spade', 'club', 'diamond'], weights=[15, 18, 15, 12], k=1)[0]

        suit_base_pv = {"heart": 15, "spade": 18, "club": 16, "diamond": 17}

        # create player value based on suit
        sd = 3
        pv = gauss(suit_base_pv[suit], sd)
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

    return "Successfully created " + str(num_of_players) + " players"


def gen_gm(league: League) -> str:
    """Generates general managers with traits"""
    traits = ['facilitator', 'promoter', 'recruiter', 'scouter', 'suitor', 'trainer']
    GM.objects.bulk_create([GM(trait=trait, league=league) for trait in traits])

    return "Successfully created " + str(len(traits)) + " GMs"


def gen_coach(league: League, num_of_coaches: int) -> str:
    """generates coaches with two attributes"""
    for _ in range(num_of_coaches):
        # coaches can have double teamwork or fame traits
        attributes = random.sample(['teamwork', 'teamwork', 'clutch', 'fame', 'fame',
                                    'focus', 'guts', 'substitution', 'underdog', 'road'], k=2)
        while True:
            first_name, last_name = random.choice(COACH_NAMES)
            try:
                with transaction.atomic():
                    Coach.objects.create(
                        name=f"{first_name} {last_name}",
                        attribute_one=attributes[0],
                        attribute_two=attributes[1],
                        league=league)
                    break  # Break the loop if the coach was created successfully
            except IntegrityError:
                continue  # Retry with a new name if IntegrityError occurs

    return "Successfully created " + str(num_of_coaches) + " coaches"
