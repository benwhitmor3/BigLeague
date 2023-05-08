from .models import *
from django.db.models.aggregates import StdDev
from django.db.models import Sum


def season_revenue(franchise: Franchise, prev_season: Season, current_season: Season, season: int,
                   games_played: int) -> int:
    total_revenue = 0
    total_revenue += ticket_revenue_per_season(franchise, current_season, games_played)
    total_revenue += box_revenue_per_season(franchise, prev_season, current_season)
    total_revenue += merchandise_revenue(current_season)
    total_revenue += tv_revenue(franchise.league, season, games_played)

    return total_revenue


def ticket_revenue_per_season(franchise: Franchise, curr_season: Season, games_played: int) -> int:
    ticket_price, advertising, fan_index = curr_season.ticket_price, curr_season.advertising, curr_season.fan_index
    stadium_grade = franchise.stadium.grade

    demand = (15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * stadium_grade - ticket_price)
    demand = round(demand, 0) if round(demand, 0) > 0 else 0

    if demand > franchise.stadium.seats:
        demand = franchise.stadium.seats
    curr_season.tickets_sold = demand
    curr_season.save()
    return ticket_price * demand * games_played


def box_revenue_per_season(franchise: Franchise, prev_season: Season, curr_season: Season) -> int:
    advertising, box_price = curr_season.advertising, curr_season.box_price
    fan_index = prev_season.fan_index
    city_value = franchise.stadium.city.city_value

    demand = ((advertising * fan_index * city_value) / 10) - ((box_price * city_value) / 10000)
    demand = round(demand, 0) if round(demand, 0) > 0 else 0

    if demand > franchise.stadium.boxes:
        demand = franchise.stadium.boxes
    curr_season.boxes_sold = demand
    curr_season.save()

    return box_price * demand


def merchandise_revenue(curr_season: Season) -> float:
    return 50000 * curr_season.advertising * curr_season.fan_index


def tv_revenue(league: League, season: int, games_played: int) -> int:
    franchises = Franchise.objects.filter(league=league)
    if season == 1:
        return 70
    else:
        # fan index for league (higher fan index adds to tv revenue)
        league_prev_fan_index = \
            Season.objects.filter(season=(season - 1), franchise__league=league).aggregate(Sum('fan_index'))[
                'fan_index__sum']
        # nolly_scull idealized std = [Average wins]/[Schedule Length]^0.5
        idealized_std = (games_played / 2) / (games_played ** 0.5)
        # actual wins std from season
        actual_std = Season.objects.filter(season=season, franchise__league=league).aggregate(StdDev('wins'))[
            'wins__stddev']
        # competitiveness
        competitiveness = actual_std / idealized_std
        # tv revenue
        return (league_prev_fan_index / competitiveness) * 1000000 / franchises.count()
