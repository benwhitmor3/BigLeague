import sqlite3
import pandas as pd
from random import gauss

team_names = ['alpha', 'bravo', 'charlie', 'delta']

league_schedule = [['alpha', 'bravo'], ['alpha', 'charlie'], ['alpha', 'delta'], ['bravo', 'charlie'],
                   ['bravo', 'delta'], ['charlie', 'delta']]


def simulation():
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

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

    # run a simulation for each scheduled game
    for y in range(len(league_schedule)):

        # num of games and sd for each player
        games = 41
        sd = 9
        a_wins = 0
        b_wins = 0

        while games > 0:
            # Generate Points Scored

            # once starter, bench, reserve is added to 'roster' column use this players
            # players.loc[(players['team'] == 'alpha') & (players['roster'] == 'starter')]['pv'].tolist()
            # players.loc[(players['team'] == 'alpha') & (players['roster'] == 'bench')]['pv'].tolist()

            ###TEAM ALPHA
            # if coach is BLANK for league_schedule[y][0]):
            #     change whatever

            starter_value = players.loc[(players['team'] == league_schedule[y][0])]['pv'][0:5].tolist()
            suit_list = players.loc[(players['team'] == league_schedule[y][0])]['suit'][0:5].tolist()
            suit_bonus()
            # Starters
            player1_points = gauss(starter_value[0], sd)
            player2_points = gauss(starter_value[1], sd)
            player3_points = gauss(starter_value[2], sd)
            player4_points = gauss(starter_value[3], sd)
            player5_points = gauss(starter_value[4], sd)

            bench_value = players.loc[(players['team'] == league_schedule[y][0])]['pv'][5:8].tolist()
            # Bench
            player6_points = gauss(bench_value[0], sd)
            player7_points = gauss(bench_value[1], sd)
            player8_points = gauss(bench_value[2], sd)

            starter_points = [player1_points, player2_points, player3_points, player4_points, player5_points]
            bench_points = [player6_points, player7_points, player8_points]
            bench_points.sort()  # this is done so can drop bench points in the substitutions

            # not perfect as will replace players in order of their starting list, does not maximize replacement with
            # WORST performance, however, if the performance is that bad to be -2 SD below value then it will still
            # probably be replaced by a bench player. Basically if only 1 bench player and two bad starters the first
            # (not worst) one will be replaced (if bench_points) is to ensure the bench_players is not an empty list
            if bench_points:
                if starter_points[0] < starter_value[0] - (2 * sd) and starter_points[0] < bench_points[-1]:
                    starter_points[0] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[1] < starter_value[1] - (2 * sd) and starter_points[1] < bench_points[-1]:
                    starter_points[1] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[2] < starter_value[2] - (2 * sd) and starter_points[2] < bench_points[-1]:
                    starter_points[2] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[3] < starter_value[3] - (2 * sd) and starter_points[3] < bench_points[-1]:
                    starter_points[3] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[4] < starter_value[4] - (2 * sd) and starter_points[4] < bench_points[-1]:
                    starter_points[4] = bench_points[-1]
                    del bench_points[-1]

            a = sum(starter_points) + suit_bonus()

            ###TEAM BRAVO

            starter_value = players.loc[(players['team'] == league_schedule[y][1])]['pv'][0:5].tolist()
            suit_list = players.loc[(players['team'] == league_schedule[y][1])]['suit'][0:5].tolist()
            suit_bonus()
            # Starters
            player1_points = gauss(starter_value[0], sd)
            player2_points = gauss(starter_value[1], sd)
            player3_points = gauss(starter_value[2], sd)
            player4_points = gauss(starter_value[3], sd)
            player5_points = gauss(starter_value[4], sd)

            bench_value = players.loc[(players['team'] == league_schedule[y][1])]['pv'][5:8].tolist()
            # Bench
            player6_points = gauss(bench_value[0], sd)
            player7_points = gauss(bench_value[1], sd)
            player8_points = gauss(bench_value[2], sd)

            starter_points = [player1_points, player2_points, player3_points, player4_points, player5_points]
            bench_points = [player6_points, player7_points, player8_points]
            bench_points.sort()  # this is done so can drop bench points in the substitutions

            # not perfect as will replace players in order of their starting list, does not maximize replacement with WORST
            # performance, however, if the performance is that bad to be -2 SD below value then it will still probably be
            # replaced by a bench player
            # (if bench_points) is to ensure the bench_players is not an empty list
            if bench_points:
                if starter_points[0] < starter_value[0] - (2 * sd) and starter_points[0] < bench_points[-1]:
                    starter_points[0] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[1] < starter_value[1] - (2 * sd) and starter_points[1] < bench_points[-1]:
                    starter_points[1] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[2] < starter_value[2] - (2 * sd) and starter_points[2] < bench_points[-1]:
                    starter_points[2] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[3] < starter_value[3] - (2 * sd) and starter_points[3] < bench_points[-1]:
                    starter_points[3] = bench_points[-1]
                    del bench_points[-1]
            if bench_points:
                if starter_points[4] < starter_value[4] - (2 * sd) and starter_points[4] < bench_points[-1]:
                    starter_points[4] = bench_points[-1]
                    del bench_points[-1]

            b = sum(starter_points) + suit_bonus()

            results["game" + str(len(results) + 1)] = ({str(league_schedule[y][0]): a, str(league_schedule[y][1]): b})

            games -= 1

    # creating dataframe for the season and summary statistics
    league_results = pd.DataFrame(results)
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    league_results.to_sql('season', conn, if_exists='replace', index=True)
    conn.close()

    # create season_summary dataframe
    season_summary = league_results[[]].copy()
    # get games played
    games_played = league_results.count(axis=1)[0]
    # get wins and create wins column
    winner = league_results.idxmax().to_list()
    team_wins = []
    for team in team_names:
        team_wins.append(winner.count(team))
    season_summary['wins'] = team_wins
    # gets losses and create losses column
    season_summary['losses'] = games_played - team_wins
    # get ppg and create ppg column
    season_summary['ppg'] = league_results.mean(axis=1)
    # get std and create std column
    season_summary['std'] = league_results.std(axis=1)

    # send dataframe to sql
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    season_summary.to_sql('season_summary', conn, if_exists='replace', index=True)
    conn.close()
