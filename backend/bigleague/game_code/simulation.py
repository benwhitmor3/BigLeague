import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import sqlite3
import pandas as pd
from random import gauss

db = '/Users/buw0017/projects/TheBigLeagueGame/backend/TheBigLeagueGame.sqlite3'


'''———————————— Simulate a Season ————————————'''


def simulation(games_per_series):
    conn = sqlite3.connect(db)
    players = pd.read_sql_query("select * from players", conn)
    franchise = pd.read_sql_query("select * from franchise", conn)
    conn.close()

    team_names = franchise.team.to_list()
    num_of_teams = len(team_names)

    # everybody plays each other once schedule
    def schedule_creation():
        schedule = []
        for base in range(0, num_of_teams):
            for other in range(base + 1, num_of_teams):
                schedule.append([team_names[base], team_names[other]])
        return schedule

    league_schedule = schedule_creation()

    suit_list = []
    results = {}

    def suit_bonus():
        suit_bonus = 0
        spades = suit_list.count("spade")
        hearts = suit_list.count("heart")
        diamonds = suit_list.count("diamond")
        clubs = suit_list.count("club")

        # spade adjustment
        if spades <= 1:
            suit_bonus += 0
        else:
            suit_bonus -= spades * (spades - 1)
        # heart adjustment
        suit_bonus += hearts * (5 - hearts)
        # diamond adjustment
        if diamonds > 0:
            suit_bonus += 2 - (diamonds - 1)
        # club adjustment
        suit_bonus += (spades * clubs)

        return suit_bonus

    # run a series for each scheduled match up
    for y in range(len(league_schedule)):
        games = games_per_series
        while games > 0:

            '''___________________________________TEAM A____________________________________'''

            # focus/guts coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'guts' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'guts':
                sd = 14
            elif franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'focus' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'focus':
                sd = 7
            else:
                sd = 9

            # once starter, bench, reserve is added to 'roster' column use this players
            # players.loc[(players['team'] == 'alpha') & (players['roster'] == 'starter')]['pv'].tolist()
            # players.loc[(players['team'] == 'alpha') & (players['roster'] == 'bench')]['pv'].tolist()

            starter_value = players.loc[(players['franchise'] == league_schedule[y][0])]['pv'][0:5].tolist()
            # sum team pv starter_value (used for underdog coach)
            a_starter_value = sum(starter_value)
            suit_list = players.loc[(players['franchise'] == league_schedule[y][0])]['suit'][0:5].tolist()

            # Starters
            player1_points = gauss(starter_value[0], sd)
            player2_points = gauss(starter_value[1], sd)
            player3_points = gauss(starter_value[2], sd)
            player4_points = gauss(starter_value[3], sd)
            player5_points = gauss(starter_value[4], sd)

            bench_value = players.loc[(players['franchise'] == league_schedule[y][0])]['pv'][5:8].tolist()

            # Bench
            player6_points = gauss(bench_value[0], sd)
            player7_points = gauss(bench_value[1], sd)
            player8_points = gauss(bench_value[2], sd)

            starter_points = [player1_points, player2_points, player3_points, player4_points, player5_points]
            bench_points = [player6_points, player7_points, player8_points]
            bench_points.sort()  # this is done so can max bench points is the first substitutions

            # substitution coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'substitution' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'substitution':
                substitution = 1
            else:
                substitution = 2

            # not perfect as will replace players in order of their starting list, does not maximize replacement with
            # WORST performance, however, if the performance is that bad to be -2 SD below value then it will still
            # probably be replaced by a bench player. Would need to sort by who had the "worst" SD not just worst
            # performance since a worse points does not mean worse performance
            if bench_points:
                if starter_points[0] < starter_value[0] - (substitution * sd) and starter_points[0] < bench_points[-1]:
                    starter_points[0] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[1] < starter_value[1] - (substitution * sd) and starter_points[1] < bench_points[-1]:
                    starter_points[1] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[2] < starter_value[2] - (substitution * sd) and starter_points[2] < bench_points[-1]:
                    starter_points[2] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[3] < starter_value[3] - (substitution * sd) and starter_points[3] < bench_points[-1]:
                    starter_points[3] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[4] < starter_value[4] - (substitution * sd) and starter_points[4] < bench_points[-1]:
                    starter_points[4] = bench_points[-1]
                    del bench_points[-1]

            # suitor GM factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['gm'].iloc[0] == 'suitor':
                a = sum(starter_points)
            else:
                a = sum(starter_points) + suit_bonus()

            '''___________________________________TEAM B____________________________________'''

            # focus/guts coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'guts' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'guts':
                sd = 14
            elif franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'focus' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'focus':
                sd = 7
            else:
                sd = 9

            starter_value = players.loc[(players['franchise'] == league_schedule[y][1])]['pv'][0:5].tolist()
            # sum team pv starter_value (used for underdog coach)
            b_starter_value = sum(starter_value)
            suit_list = players.loc[(players['franchise'] == league_schedule[y][1])]['suit'][0:5].tolist()

            # Starters
            player1_points = gauss(starter_value[0], sd)
            player2_points = gauss(starter_value[1], sd)
            player3_points = gauss(starter_value[2], sd)
            player4_points = gauss(starter_value[3], sd)
            player5_points = gauss(starter_value[4], sd)

            bench_value = players.loc[(players['franchise'] == league_schedule[y][1])]['pv'][5:8].tolist()

            # Bench
            player6_points = gauss(bench_value[0], sd)
            player7_points = gauss(bench_value[1], sd)
            player8_points = gauss(bench_value[2], sd)

            starter_points = [player1_points, player2_points, player3_points, player4_points, player5_points]
            bench_points = [player6_points, player7_points, player8_points]
            bench_points.sort()  # this is done so can max bench points is the first substitutions

            # substitution coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'substitution' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'substitution':
                substitution = 1
            else:
                substitution = 2

            # not perfect as will replace players in order of their starting list, does not maximize replacement with
            # WORST performance, however, if the performance is that bad to be -2 SD below value then it will still
            # probably be replaced by a bench player. Would need to sort by who had the "worst" SD not just worst
            # performance since a worse points does not mean worse performance
            if bench_points:
                if starter_points[0] < starter_value[0] - (substitution * sd) and starter_points[0] < bench_points[-1]:
                    starter_points[0] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[1] < starter_value[1] - (substitution * sd) and starter_points[1] < bench_points[-1]:
                    starter_points[1] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[2] < starter_value[2] - (substitution * sd) and starter_points[2] < bench_points[-1]:
                    starter_points[2] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[3] < starter_value[3] - (substitution * sd) and starter_points[3] < bench_points[-1]:
                    starter_points[3] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[4] < starter_value[4] - (substitution * sd) and starter_points[4] < bench_points[-1]:
                    starter_points[4] = bench_points[-1]
                    del bench_points[-1]

            # suitor GM factor
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['gm'].iloc[0] == 'suitor':
                b = sum(starter_points)
            else:
                b = sum(starter_points) + suit_bonus()

            '''__________________________more post_points coaching factors applied_______________________'''
            # underdog coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'underdog' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'underdog':
                if a_starter_value < b_starter_value:
                    a = a + 0.4 * (b_starter_value - a_starter_value)
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'underdog' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'underdog':
                if b_starter_value < a_starter_value:
                    b = b + 0.4 * (a_starter_value - b_starter_value)

            # teamwork coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'teamwork' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'teamwork':
                a = a + 3
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'teamwork' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'teamwork':
                b = b + 3

            # clutch coach factor
            if franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach1'].iloc[0] == 'clutch' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][0])]['coach2'].iloc[0] == 'clutch':
                if a < b:
                    a = a + 6
            if franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach1'].iloc[0] == 'clutch' \
                    or franchise.loc[(franchise['team'] == league_schedule[y][1])]['coach2'].iloc[0] == 'clutch':
                if b < a:
                    b = b + 6

            results["game" + str(len(results) + 1)] = ({str(league_schedule[y][0]): a, str(league_schedule[y][1]): b})

            games -= 1

    '''__________________________season_stats_____and______season_summary_______________________'''
    # creating df for the season statistics
    season = pd.DataFrame(results)
    conn = sqlite3.connect(db)
    season.to_sql('season', conn, if_exists='replace', index=True)
    conn.close()

    # create season_summary df
    season_summary = season[[]].copy()
    # get games played
    games_played = season.count(axis=1)[0]
    # get wins and create wins column
    winner = season.idxmax().to_list()
    team_wins = []
    for team in team_names:
        team_wins.append(winner.count(team))
    season_summary['wins'] = team_wins
    # gets losses and create losses column
    season_summary['losses'] = games_played - team_wins
    # get ppg and create ppg column
    season_summary['ppg'] = season.mean(axis=1)
    # get std
    season_summary['std'] = season.std(axis=1)

    # send dataframe to sql
    conn = sqlite3.connect(db)
    season_summary.to_sql('season_summary', conn, if_exists='replace', index=True)
    conn.close()

    print(season_summary)
