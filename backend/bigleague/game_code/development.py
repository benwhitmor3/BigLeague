import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import pandas as pd
import sqlite3
from random import gauss
from variables import *

# need to add coaching/gm changes for development (should add column)? or maybe do a join in SQL
# based on team?

db = '/Users/buw0017/projects/ben_walkthrough/bigleague.db'


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


def stadium_grade():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    for y in range(len(team_names)):
        franchise.loc[franchise['team'] == team_names[y], 'stadium_grade'] -= 1

        # ADD CHANGES FOR ACTIONS

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()

    return franchise

def actions():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    actions = ['improved bathrooms', 'improved concessions', 'jumbotron', 'upscale bar',
               'hall of fame', 'improved seating', 'improved sound', 'party deck', 'w-fi',
               'fan night', 'family game', 'door prize', 'mvp night', 'parade of championships',
               'bribe the refs', 'easy runs', 'fan factor', 'train player', 'farm system',
               'fan favourites', 'gourmet restaurant', 'beer garden', 'naming rights',
               'event planning', 'bribe city officials']

    # maybe need to edit this to make actions dependent on coach gm?
    # add actions columns to franchise dataframe (number of cols dependent on range)
    for y in range(5):
        franchise['actions' + str(y + 1)] = ''

        # for each row append a sample of actions from the list to each column
        for index, row in franchise.iterrows():
            for team in team_names:
                action = random.sample(actions, k=1)
                franchise.at[index, 'actions' + str(y + 1)] = action[0]

    conn = sqlite3.connect(db)
    franchise.to_sql('franchise', conn, if_exists='replace', index=False)
    conn.close()