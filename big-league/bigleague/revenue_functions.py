from .models import *
from django.db.models import Sum, StdDev
import statistics


def season_revenue(franchise: Franchise, prev_season: Season, current_season: Season, season: int,
                   games_played: int) -> int:
    total_revenue = 0
    total_revenue += ticket_revenue_per_season(franchise, current_season, games_played)
    total_revenue += box_revenue_per_season(franchise, prev_season, current_season)
    total_revenue += merchandise_revenue(current_season)
    total_revenue += tv_revenue(franchise.league, season)

    return total_revenue


def ticket_demand_per_game(ticket_price, advertising, fan_index, grade):
    return (15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * grade - ticket_price)


def ticket_revenue_per_game(ticket_price, advertising, fan_index, grade):
    return ticket_price * ticket_demand_per_game(ticket_price, advertising, fan_index, grade)


def ticket_revenue_per_season(franchise: Franchise, curr_season: Season, games_played: int) -> float:
    ticket_price, advertising, fan_index = curr_season.ticket_price, curr_season.advertising, curr_season.fan_index
    stadium_grade, stadium_capacity = franchise.stadium.grade, franchise.stadium.seats

    if curr_season.season == 1:
        fan_index = 70

    tickets_demanded = ticket_demand_per_game(ticket_price, advertising, fan_index, stadium_grade)
    tickets_sold = min(tickets_demanded, stadium_capacity)
    tickets_sold = max(round(tickets_sold), 0)

    curr_season.tickets_sold = tickets_sold
    curr_season.save()

    return ticket_price * tickets_sold * games_played


def box_demand_per_game(box_price, advertising, fan_index, city_value):
    return ((advertising * fan_index * city_value) / 10) - ((box_price * city_value) / 10_000)


def box_revenue_per_game(box_price, advertising, fan_index, city_value):
    return box_price * box_demand_per_game(box_price, advertising, fan_index, city_value)


def box_revenue_per_season(franchise: Franchise, prev_season: Season, curr_season: Season) -> int:
    advertising, box_price = curr_season.advertising, curr_season.box_price
    fan_index = prev_season.fan_index
    city_value, stadium_capacity = franchise.stadium.city.city_value, franchise.stadium.boxes

    if curr_season.season == 1:
        fan_index = 70

    boxes_demanded = box_demand_per_game(box_price, advertising, fan_index, city_value)
    boxes_sold = min(boxes_demanded, stadium_capacity)
    boxes_sold = min(boxes_sold, stadium_capacity)

    curr_season.boxes_sold = int(boxes_sold)
    curr_season.save()

    return box_price * boxes_sold


def merchandise_revenue(curr_season: Season) -> float:
    return 50000 * curr_season.advertising * curr_season.fan_index


def calculate_competitiveness(wins, losses):
    win_ratio = wins / (wins + losses)
    return win_ratio


def tv_revenue(league: League, season: int) -> int:
    franchises = Franchise.objects.filter(league=league)
    if season == 1:
        return 70
    else:
        # fan index for league (higher fan index adds to tv revenue)
        league_prev_fan_index = Season.objects.filter(season=(season - 1), franchise__league=league).aggregate(Sum('fan_index'))['fan_index__sum']
        # Calculate competitiveness for the league
        win_ratios = [calculate_competitiveness(franchise.season_set.get(season=season).wins, franchise.season_set.get(season=season).losses) for franchise in franchises]
        competitiveness = 1 - statistics.stdev(win_ratios)

        # Calculate TV revenue based on competitiveness
        base_revenue = 1_000_000
        tv_revenue_per_team = (league_prev_fan_index * competitiveness * base_revenue) / len(franchises)

        return tv_revenue_per_team
