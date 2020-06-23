import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import pandas as pd
import sqlite3
import random
from random import gauss

# need to add coaching/gm changes for development (e.g. trainer)

db = '/Users/buw0017/projects/TheBigLeagueGame/backend/TheBigLeagueGame.sqlite3'


def development():
    # call database for players
    conn = sqlite3.connect(db)
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

    # adding plus one to all ages (affects entire column)
    players['age'] += 1

    # updating pv by age iterating through (allows changes to be non-uniform)
    for index, row in players.iterrows():
        # adds 1 with s.d. 1 for players 20 or younger
        if row['age'] <= 20:
            players.at[index, 'pv'] = row['pv'] + gauss(1, 1)
        # adds 0 with s.d. 1 for players 21 to 23
        elif 21 <= row['age'] <= 23:
            players.at[index, 'pv'] = row['pv'] + gauss(0, 1)
        # subtracts 1 with s.d. 1 for players 24 to 26
        elif 24 <= row['age'] <= 26:
            players.at[index, 'pv'] = row['pv'] + gauss(-1, 1)
        # subtracts 2 with s.d. 1 for players 27 to 30
        elif 27 <= row['age'] <= 30:
            players.at[index, 'pv'] = row['pv'] + gauss(-2, 1)
        # if player is over 30 years old they retire
        else:
            players.at[index, 'name'] = 'retired'

    # if pv gets below an 8 force player to retire
    for index, row in players.iterrows():
        if row['pv'] < 8:
            players.at[index, 'name'] = 'retired'

    # updating epv based on new pv
    for index, row in players.iterrows():
        players.at[index, 'epv'] = row['pv'] + gauss(0, 3)
    # updating s_epv based on new pv
    for index, row in players.iterrows():
        players.at[index, 'epv'] = row['pv'] + gauss(0, 2)

    # updating contract years and option years left (once option is zero can be activated)
    for index, row in players.iterrows():
        if row['contract'] != 0:
            players.at[index, 'contract'] = row['contract'] - 1
        if row['t_option'] > 0:
            players.at[index, 't_option'] = row['t_option'] - 1
        if row['p_option'] > 0:
            players.at[index, 'p_option'] = row['p_option'] - 1

    # updates SQL table
    conn = sqlite3.connect(db)
    players.to_sql('players', conn, if_exists='replace', index=False)
    conn.close()


# ADD CHANGES FOR ACTIONS
def stadium_grade():
    conn = sqlite3.connect(db)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    team_names = franchise.team.to_list()

    for y in range(len(team_names)):
        franchise.loc[franchise['team'] == team_names[y], 'stadium_grade'] -= 1

    # updates SQL table
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise


def actions():
    conn = sqlite3.connect(db)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    league_actions = ['improved bathrooms', 'improved concessions', 'jumbotron', 'upscale bar',
                      'hall of fame', 'improved seating', 'improved sound', 'party deck', 'wi-fi',
                      'fan night', 'family game', 'door prizes', 'mvp night', 'parade of championships',
                      'bribe the refs', 'easy runs', 'fan factor', 'train player', 'farm system',
                      'fan favourites', 'gourmet restaurant', 'beer garden', 'naming rights',
                      'event planning']

    teams = franchise.team.to_list()
    d = dict.fromkeys(teams, None)
    for team in teams:
        d[team] = random.sample(league_actions, k=3)

    # teams = franchise.team.to_list()
    # actions = franchise.actions.to_list()
    # d = dict(zip(teams, actions))

    # handle requirements on the front end (i.e. promoter GM or trainer GM needed), may need to add column in DB
    # for things like championships and beer garden etc.
    for team in teams:
        print(team)
        if 'improved bathrooms' in d[team]:
            print('+1 SS')
        if 'improved concessions' in d[team]:
            print('+1 SS')
        if 'jumbotron' in d[team]:
            print('+1 SS')
        if 'upscale bar' in d[team]:
            print('+1 SS')

        if 'hall of fame' in d[team]:
            print('+2 SS')
        if 'improved seating' in d[team]:
            print('+2 SS')
        if 'improved sound' in d[team]:
            print('+2 SS')
        if 'party deck' in d[team]:
            print('+2 SS')
        if 'wi-fi' in d[team]:
            print('+2 SS')

        if 'fan night' in d[team]:
            print('+6 FI')
        if 'family game' in d[team]:
            print('+6 FI')
        if 'door prizes' in d[team]:
            print('+6 FI')
        if 'mvp night' in d[team]:
            print('+10 FI')
        if 'parade of champions' in d[team]:
            print('+10 FI')

        if 'bribe the refs' in d[team]:
            print('+1 HF')
        if 'easy runs' in d[team]:
            print('+1 HF')
        if 'fan factor' in d[team]:
            print('+1 HF')

        if 'train player' in d[team]:
            print('train player')

        if 'fan favourites' in d[team]:
            print('+1 SS and +1 FI')
        if 'gourmet restaurant' in d[team]:
            print('10 mill with 5 mill s.d.')
        if 'beer garden' in d[team]:
            print('+2 FI and +1 HF')
        if 'naming rights' in d[team]:
            print('75 mill with 25 mill s.d.?')
        if 'event planning' in d[team]:
            print('5*SS*CV*Seats')

