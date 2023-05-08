from django.db import IntegrityError
from .models import *
import random
from random import gauss
import names


def gen_franchise(league, num_of_franchises=7):
    """generates franchises and stadiums based on list of names"""
    # create bot franchises (36 name options)
    franchise_names = ["Aces", "All Stars", "Avengers", "Aztecs", "Big Blues", "Big Red", "Champions",
                       "Crimson", "Dragons", "Devils", "Dream Team", "Elite", "Flames", "Flash", "Force", "Groove",
                       "Heatwave", "Icons", "Jam", "Legends", "Masters", "Monarchy", "Pioneers", "Pride", "Racers",
                       "Rebels", "Royals", "Saints", "Soul", "Spirit", "Storm", "Titans", "United", "Violets", "Voodoo",
                       "Warriors", "Wild"]
    franchise_list = random.sample(franchise_names, k=num_of_franchises)
    cities = City.objects.filter(league=league)
    for idx, franchise_name in enumerate(franchise_list):
        franchise = Franchise.objects.create(franchise=franchise_name, league=league)
        Stadium.objects.create(
            stadium_name=franchise_name + ' stadium',
            seats=random.randint(30000, 100000),
            boxes=random.randint(150, 750),
            grade=20,
            max_grade=20,
            home_field_advantage=0,
            city=random.choice(cities),
            franchise=franchise
        )

    # create actions and season 1 for ALL league franchises
    for franchise in Franchise.objects.filter(league=league):
        Season.objects.create(franchise=franchise, season=1, fan_index=70)
        Action.objects.create(franchise=franchise)

    return "Successfully created " + str(num_of_franchises) + " franchises"


def gen_city(league, num_of_cities=8):
    """generates cities based on list of cities and city values"""
    cities = ["Los Angeles", "New York", "London", "Chicago", "San Francisco", "Washington", "Phoenix", "Indianapolis",
              "Philadelphia", "Houston", "Dallas", "Denver", "Boston", "Las Vegas", "Seattle",
              "Atlanta", "Miami", "Toronto", "Vancouver", "Detroit"]
    values = [5, 6, 7, 8, 9, 10, 11, 12]
    cities_list = random.sample(cities, k=num_of_cities)
    for city in cities_list:
        City.objects.create(city=city, city_value=random.choice(values), league=league)


def gen_player(league, num_of_players=50, rookies=True):
    """generates players with age determined by rookie criteria"""
    for players in range(num_of_players):

        if rookies is False:
            age = random.randint(18, 30)
        else:
            age = random.randint(18, 22)

        suit = random.choices(['heart', 'spade', 'club', 'diamond'], weights=[15, 18, 15, 12], k=1)[0]

        # create player value
        sd = 3
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

        # need Integrity Error as name is primary key
        try:
            Player.objects.create(
                name=names.get_full_name(),
                suit=suit,
                age=age,
                pv=pv,
                epv=epv,
                s_epv=s_epv,
                year=1,
                league=league)
        except IntegrityError as e:
            print(e)


def gen_gm(league):
    """generates general managers with traits"""
    gms = ['facilitator', 'promoter', 'recruiter', 'scouter', 'suitor', 'trainer']
    for trait in gms:
        GM.objects.create(trait=trait, league=league)


def gen_coach(league, num_of_coaches=10):
    """generates coaches with two attributes"""
    for coach in range(num_of_coaches):
        # coaches can have double teamwork or fame traits
        attributes = random.sample(['teamwork', 'teamwork', 'clutch', 'fame', 'fame',
                                    'focus', 'guts', 'substitution', 'underdog', 'road'], k=2)
        Coach.objects.create(name=names.get_full_name(),
                             attribute_one=attributes[0], attribute_two=attributes[1], league=league)
