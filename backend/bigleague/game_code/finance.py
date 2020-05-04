import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import sqlite3
import pandas as pd
import numpy as np
import random
from random import gauss
from variables import *

conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
season_summary = pd.read_sql_query("select * from season_summary", conn)
franchise = pd.read_sql_query("select * from franchise", conn)
conn.close()


'''NEED TO ADD COACHES SALARIES TO DATABASE AND PRICES FOR SEATS AND TICKETS'''

'''_____________________________________revenue_and_costs_functions___________________________________'''


def operating_costs():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    # add 50 million with 5 million standard deviation to each team as standard operating cost
    for y in range(len(team_names)):
        franchise.loc[franchise['team'] == team_names[y], 'expenses'] += gauss(50000000, 5000000)

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def salary_cost():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

    # get salary costs for each team and add them to expenses
    for y in range(len(team_names)):
        salaries = players.loc[(players['team'] == team_names[y])]['salary'].sum()
        franchise.loc[franchise['team'] == team_names[y], 'expenses'] += salaries

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def advertising_cost():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        ad = franchise.loc[(franchise['team'] == team_names[y])]['advertising'].iloc[0]
        franchise.loc[franchise['team'] == team_names[y], 'expenses'] += (2 ** ad) * 1000000

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def merchandise_revenue():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        ad = franchise.loc[(franchise['team'] == team_names[y])]['advertising'].iloc[0]
        fi = franchise.loc[(franchise['team'] == team_names[y])]['fanindex'].iloc[0]

        franchise.loc[franchise['team'] == team_names[y], 'revenue'] += (50000 * (ad * fi))

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def seats_revenue():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        ad = franchise.loc[(franchise['team'] == team_names[y])]['advertising'].iloc[0]
        fi = franchise.loc[(franchise['team'] == team_names[y])]['fanindex'].iloc[0]
        sg = franchise.loc[(franchise['team'] == team_names[y])]['stadium_grade'].iloc[0]
        cv = franchise.loc[(franchise['team'] == team_names[y])]['city_value'].iloc[0]
        p = 250

        tickets_sold_per_game = (15 * ad + 200) * (6 * ad + 2 * fi + 3 * sg - p)
        luxury_boxes_sold = ((ad * fi * cv) / 10) - ((pb * cv) / 10000)

        # if tickets sold are more than capacity then cap the tickets sold at capacity
        if tickets_sold_per_game > franchise.loc[(franchise['team'] == team_names[y])]['stadium_seats'].iloc[0]:
            tickets_sold_per_game = franchise.loc[(franchise['team'] == team_names[y])]['stadium_seats'].iloc[0]
        else:
            tickets_sold_per_game = (15 * ad + 200) * (6 * ad + 2 * fi + 3 * sg - p)
        # if you sell negative tickets then make it 0
        if tickets_sold_per_game < 0:
            tickets_sold_per_game = 0

        franchise.loc[franchise['team'] == team_names[y], 'revenue'] += tickets_sold_per_game * p

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def boxes_revenue():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        ad = franchise.loc[(franchise['team'] == team_names[y])]['advertising'].iloc[0]
        fi = franchise.loc[(franchise['team'] == team_names[y])]['fanindex'].iloc[0]
        cv = franchise.loc[(franchise['team'] == team_names[y])]['city_value'].iloc[0]
        p = 500000

        luxury_boxes_sold = ((ad * fi * cv) / 10) - ((p * cv) / 10000)

        # if boxes sold are more than capacity then cap the boxes sold at capacity
        if luxury_boxes_sold > franchise.loc[(franchise['team'] == team_names[y])]['stadium_boxes'].iloc[0]:
            luxury_boxes_sold = franchise.loc[(franchise['team'] == team_names[y])]['stadium_boxes'].iloc[0]
        else:
            luxury_boxes_sold = ((ad * fi * cv) / 10) - ((p * cv) / 10000)
        # if you sell negative tickets then make it 0
        if luxury_boxes_sold < 0:
            luxury_boxes_sold = 0

        franchise.loc[franchise['team'] == team_names[y], 'revenue'] += luxury_boxes_sold * p

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def tv_revenue():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    season_summary = pd.read_sql_query("select * from season_summary", conn)
    season = pd.read_sql_query("select * from season", conn)
    conn.close()

    '''vaguely based on an 80 game season'''

    # sum fanindex for teams (higher fanindex adds to tv revenue)
    sum_fi = franchise.fanindex.sum()
    # sum ppg for teams (higher scoring adds to tv revenue)
    sum_ppg = season.mean(axis=1).sum()
    # get games played / 2
    average_wins = season.count(axis=1)[0] / 2

    # higher team delta means league was less competitive
    team_deltas = 0
    for y in range(len(team_names)):
        team_deltas += abs(
            season_summary.loc[(season_summary['index'] == team_names[y])]['wins'].iloc[0] - average_wins)

    # get average deviation since more teams makes delta higher
    deviation = team_deltas / len(team_names)

    # bad
    if deviation > 20:
        multiplier = gauss(0.8, 0.1)
    # average
    elif deviation > 10:
        multiplier = gauss(1, 0.1)
    # good
    else:
        multiplier = gauss(1.2, 0.1)

    # calculates tv revenue assigned equally to each team
    tv_rev = ((sum_fi * sum_ppg) / len(team_names)) * multiplier * 1500

    # applies tv revenue to each team revenue
    for y in range(len(team_names)):
        franchise.loc[franchise['team'] == team_names[y], 'revenue'] += tv_rev

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


'''_____________________________________stadium_functions___________________________________'''


def construction():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        stadium_seats = franchise.loc[(franchise['team'] == team_names[y])]['stadium_seats'].iloc[0]
        stadium_boxes = franchise.loc[(franchise['team'] == team_names[y])]['stadium_boxes'].iloc[0]

        seats_cost = 15000 * stadium_seats
        boxes_cost = 500000 * stadium_boxes

        franchise.loc[franchise['team'] == team_names[y], 'expenses'] += seats_cost + boxes_cost

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def upkeep():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        stadium_seats = franchise.loc[(franchise['team'] == team_names[y])]['stadium_seats'].iloc[0]
        stadium_boxes = franchise.loc[(franchise['team'] == team_names[y])]['stadium_boxes'].iloc[0]
        stadium_grade = franchise.loc[(franchise['team'] == team_names[y])]['stadium_grade'].iloc[0]

        seats_upkeep = 200 * stadium_seats
        boxes_upkeep = 20000 * stadium_boxes
        grade_upkeep = 200000 * stadium_grade

        franchise.loc[franchise['team'] == team_names[y], 'expenses'] += seats_upkeep + boxes_upkeep + grade_upkeep

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def renovation():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    age = 1

    franchise.loc[franchise['team'] == team_names[y], 'expenses'] += 20000000 * np.log(age + 1)

    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


'''_____________________________________fan_functions___________________________________'''


def fanbase():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    season_summary = pd.read_sql_query("select * from season_summary", conn)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

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

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def fanindex():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        fb = franchise.loc[(franchise['team'] == team_names[y])]['fanbase'].iloc[0]
        fi_tminus = franchise.loc[(franchise['team'] == team_names[y])]['fanindex'].iloc[0]

        if franchise.loc[(franchise['team'] == team_names[y])]['coach1'].iloc[0] == 'fame' \
                or franchise.loc[(franchise['team'] == team_names[y])]['coach2'].iloc[0] == 'fame':
            fame = 5
        else:
            fame = 0

        franchise.loc[franchise['team'] == team_names[y], 'fanindex'] = (0.7 * fb + 0.4 * fi_tminus) + fame

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


'''_____________________________________trade_functions___________________________________'''


def money_payment():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    sending_team = 'alpha'
    receiving_team = 'bravo'
    amount = 1000000

    franchise.loc[franchise['team'] == sending_team, 'expenses'] += amount
    franchise.loc[franchise['team'] == receiving_team, 'revenue'] += amount

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def trade_player():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

    receiving_team = 'bravo'
    player = 'Sharon Matthews'

    players.loc[players['name'] == player, 'team'] = receiving_team

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    players.to_sql('players', conn, if_exists='replace', index=False)
    conn.close()

    return players
