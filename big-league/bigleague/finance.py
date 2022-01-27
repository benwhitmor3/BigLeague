from .models import *
from django.db.models.aggregates import StdDev
from django.db.models import Sum


'''_____________________________________revenue_functions___________________________________'''


def ticket_revenue_per_season(price, games_played, advertising, fan_index, stadium, current_season):
    demand = (15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * stadium.grade - price)
    demand = round(demand, 0) if round(demand, 0) > 0 else 0
    if demand > stadium.seats:
        current_season.tickets_sold = stadium.seats
        current_season.save()
        return price * stadium.seats * games_played
    else:
        current_season.tickets_sold = demand
        current_season.save()
        return price * demand * games_played


def box_revenue_per_season(price, advertising, prev_fan_index, stadium, current_season):
    demand = ((advertising * prev_fan_index * stadium.city.city_value) / 10) - (
            (price * stadium.city.city_value) / 10000)
    demand = round(demand, 0) if round(demand, 0) > 0 else 0
    if demand > stadium.boxes:
        current_season.boxes_sold = stadium.boxes
        current_season.save()
        return price * stadium.boxes
    else:
        current_season.boxes_sold = demand
        current_season.save()
        return price * demand


def merchandise_revenue(advertising, fan_index):
    return 50000 * advertising * fan_index


def tv_revenue(league, season, games_played):
    franchises = Franchise.objects.filter(league=league)
    if season == 1:
        return 70
    else:
        # fan index for league (higher fan index adds to tv revenue)
        league_prev_fan_index = Season.objects.filter(season=(season-1), franchise__league=league).aggregate(Sum('fan_index'))['fan_index__sum']
        # nolly_scull idealized std = [Average wins]/[Schedule Length]^0.5
        idealized_std = (games_played / 2) / (games_played ** 0.5)
        # actual wins std from season
        actual_std = Season.objects.filter(season=season, franchise__league=league).aggregate(StdDev('wins'))['wins__stddev']
        # competitiveness
        competitiveness = actual_std / idealized_std
        # tv revenue
        return (league_prev_fan_index / competitiveness) * 1000000 / franchises.count()


'''_____________________________________cost_functions___________________________________'''


def stadium_construction(franchise, season):
    if season == 1:
        return (franchise.stadium.seats * 15000) + (franchise.stadium.boxes * 500000)
    else:
        return 0


def stadium_upkeep(franchise, season):
    if season > 1:
        return (franchise.stadium.seats * 200) + (franchise.stadium.boxes * 20000) + (franchise.stadium.grade * 200000)
    else:
        return 0


def renovation():
    return "currently done via frontend"


def operating_cost():
    return 50000000


def advertising_cost(advertising):
    return (2 ** (advertising-1)) * 1000000


def salary_cost(franchise):
    return Player.objects.filter(franchise=franchise).aggregate(Sum('salary'))['salary__sum'] * 1000000



