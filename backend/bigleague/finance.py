import sqlite3
import pandas as pd
import numpy as np
from .models import *
from django.db.models.aggregates import StdDev
from django.db.models import Sum



'''NEED TO ADD COACHES SALARIES TO DATABASE AND PRICES FOR SEATS AND TICKETS'''

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


def operating_cost():
    return 50000000


def advertising_cost(advertising):
    return (2 ** (advertising-1)) * 1000000


def salary_cost(franchise):
    return Player.objects.filter(franchise=franchise).aggregate(Sum('salary'))['salary__sum'] * 1000000


'''_____________________________________stadium_functions___________________________________'''


# def construction():
#     conn = sqlite3.connect(db)
#     franchise = pd.read_sql_query("select * from franchise", conn)
#     conn.close()
#
#     team_names = franchise.team.to_list()
#
#     for y in range(len(team_names)):
#         stadium_seats = franchise.loc[(franchise['team'] == team_names[y])]['stadium_seats'].iloc[0]
#         stadium_boxes = franchise.loc[(franchise['team'] == team_names[y])]['stadium_boxes'].iloc[0]
#
#         seats_cost = 15000 * stadium_seats
#         boxes_cost = 500000 * stadium_boxes
#
#         franchise.loc[franchise['team'] == team_names[y], 'expenses'] += seats_cost + boxes_cost
#
#     # updates SQL table
#     conn = sqlite3.connect(db)
#     franchise.to_sql('franchise', conn, if_exists='replace', index=False)
#     conn.close()
#
#     return franchise



def renovation():
    conn = sqlite3.connect(db)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    team_names = franchise.team.to_list()

    age = 1

    franchise.loc[franchise['team'] == team_names[y], 'expenses'] += 20000000 * np.log(age + 1)

    conn = sqlite3.connect(db)
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


'''_____________________________________fan_functions___________________________________'''


def fanbase():
    conn = sqlite3.connect(db)
    season_summary = pd.read_sql_query("select * from season_summary", conn)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    team_names = franchise.team.to_list()

    for y in range(len(team_names)):
        cv = franchise.loc[(franchise['team'] == team_names[y])]['city_value'].iloc[0]
        ppg = season_summary.loc[(season_summary['index'] == team_names[y])]['ppg'].iloc[0]
        wins = season_summary.loc[(season_summary['index'] == team_names[y])]['wins'].iloc[0]
        losses = season_summary.loc[(season_summary['index'] == team_names[y])]['losses'].iloc[0]
        champs = 0
        bonuses = 0
        penalties = 0

        franchise.loc[franchise['team'] == team_names[y], 'fanbase'] = \
            2 * cv + ppg + wins - losses + 3 * champs + bonuses - penalties

    # updates SQL table
    conn = sqlite3.connect(db)
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def fanindex():
    conn = sqlite3.connect(db)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    team_names = franchise.team.to_list()

    for y in range(len(team_names)):
        fb = franchise.loc[(franchise['team'] == team_names[y])]['fanbase'].iloc[0]
        fi_tminus = franchise.loc[(franchise['team'] == team_names[y])]['fanindex'].iloc[0]

        if franchise.loc[(franchise['team'] == team_names[y])]['coach1'].iloc[0] == 'fame' \
                or franchise.loc[(franchise['team'] == team_names[y])]['coach2'].iloc[0] == 'fame':
            fame = 5
        else:
            fame = 0

        franchise.loc[franchise['team'] == team_names[y], 'fanindex'] = (0.7 * fb + 0.4 * fi_tminus) + fame

    # updates SQL table
    conn = sqlite3.connect(db)
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


'''_____________________________________trade_functions___________________________________'''


def money_payment():
    conn = sqlite3.connect(db)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    sending_team = 'alpha'
    receiving_team = 'bravo'
    amount = 1000000

    franchise.loc[franchise['team'] == sending_team, 'expenses'] += amount
    franchise.loc[franchise['team'] == receiving_team, 'revenue'] += amount

    # updates SQL table
    conn = sqlite3.connect(db)
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def trade_player():
    conn = sqlite3.connect(db)
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

    receiving_team = 'bravo'
    player = 'Sharon Matthews'

    players.loc[players['name'] == player, 'team'] = receiving_team

    # updates SQL table
    conn = sqlite3.connect(db)
    players.to_sql('players', conn, if_exists='replace', index=False)
    conn.close()

    return players
