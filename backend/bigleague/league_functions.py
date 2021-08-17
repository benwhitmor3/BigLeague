import random
import pandas as pd
from .generator import gen_salary, gen_grade
from .models import *


def sign_players(franchise):
    for player in Player.objects.filter(franchise=franchise, contract__isnull=True):
        # set contract
        player.contract = random.randint(1, 5)
        # set t_option
        if player.contract == 5:
            options = [None, None, None, 1, 2, 3, 4]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 4:
            options = [None, None, None, 1, 2, 3]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 3:
            options = [None, None, 1, 2]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 2:
            options = [None, None, 1]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 1:
            player.t_option = None
        # set p_option
        if player.t_option is None:
            if player.contract == 5:
                options = [None, None, None, 1, 2, 3, 4]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 4:
                options = [None, None, None, 1, 2, 3]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 3:
                options = [None, None, 1, 2]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 2:
                options = [None, 1]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 1:
                player.p_option = None
        else:
            player.p_option = None
        # set renew
        renew_weight = ["no"] * 7 + ["non-repeat"] * 1 + ["repeat"] * 2
        player.renew = random.choice(renew_weight)

        player.salary = gen_salary(player.contract, player.epv, player.renew, player.t_option, player.p_option,
                                   player.age)
        player.grade = gen_grade(player.salary, player.contract, player.epv, player.renew, player.t_option,
                                 player.p_option, player.age)

        player.save()

    return "Signed players for " + franchise.franchise


def set_lineup(league, franchise):

    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[:5]:
        player.lineup = "starter"
        player.save()
    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[5:8]:
        player.lineup = "rotation"
        player.save()
    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[8:]:
        player.lineup = "bench"
        player.save()

    if franchise.gm is None:
        franchise.gm = random.sample(set(GM.objects.filter(league=league)), 1)[0]
    if franchise.coach is None:
        franchise.coach = random.sample(set(Coach.objects.filter(league=league, franchise=None)), 1)[0]
    franchise.save()

    return "Set Lineup for " + franchise.franchise


def simulate_season(league, season):

    # everybody plays each other once schedule
    def schedule_creation():
        franchises = Franchise.objects.filter(league=league)
        schedule = []
        for base in range(0, franchises.count()):
            for other in range(base + 1, franchises.count()):
                schedule.append([franchises[base], franchises[other]])
        return schedule

    def suit_bonus(suit_list):
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

    def simulate_game(home, away):

        '''___________________________________Home____________________________________'''

        if home.coach.attribute_one == 'guts' or home.coach.attribute_two == 'guts':
            sd = 14
        elif home.coach.attribute_one == 'focus' or home.coach.attribute_two == 'focus':
            sd = 7
        else:
            sd = 9

        starters = Player.objects.filter(franchise=home, lineup='starter')
        rotation = Player.objects.filter(franchise=home, lineup='rotation')

        # sum franchise pv starter_value (used for underdog coach)
        home_starters_pv = sum(Player.objects.filter(franchise=home, lineup='starter').values_list('pv', flat=True))
        suit_list = Player.objects.filter(franchise=home, lineup='starter').values_list('suit', flat=True)

        # Starters
        starter_points = []
        for starter in starters:
            starter_points.append(random.gauss(starter.pv, sd))

        # Rotation
        rotation_points = []
        for r in rotation:
            rotation_points.append(random.gauss(r.pv, sd))
        rotation_points.sort()  # this is done so can get max rotation points with the first substitution

        # substitution coach factor
        if home.coach.attribute_one == 'substitution' or home.coach.attribute_two == 'substitution':
            substitution = 1
        else:
            substitution = 2

        # if rotation points available, if starter is below sd threshold and lower than rotation option,
        # then replace relevant starter_points
        for idx, player in enumerate(zip(starter_points, starters)):
            if rotation_points:
                if player[0] < (player[1].pv - (substitution * sd)) and player[0] < rotation_points[-1]:
                    starter_points[idx] = rotation_points[-1]
                    del rotation_points[-1]

        # suitor GM factor
        if home.gm.trait == 'suitor':
            home_points = sum(starter_points)
        else:
            # needs list as passes queryset
            home_points = sum(starter_points) + suit_bonus(list(suit_list))

        '''___________________________________Away____________________________________'''

        # focus/guts coach factor
        if away.coach.attribute_one == 'guts' or away.coach.attribute_two == 'guts':
            sd = 14
        elif away.coach.attribute_one == 'focus' or away.coach.attribute_two == 'focus':
            sd = 7
        else:
            sd = 9

        starters = Player.objects.filter(franchise=away, lineup='starter')
        rotation = Player.objects.filter(franchise=away, lineup='rotation')

        # sum franchise pv starter_value (used for underdog coach)
        away_starters_pv = sum(Player.objects.filter(franchise=away, lineup='starter').values_list('pv', flat=True))
        suit_list = Player.objects.filter(franchise=away, lineup='starter').values_list('suit', flat=True)

        # Starters
        starter_points = []
        for starter in starters:
            starter_points.append(random.gauss(starter.pv, sd))

        # Rotation
        rotation_points = []
        for r in rotation:
            rotation_points.append(random.gauss(r.pv, sd))
        rotation_points.sort()  # this is done so can get max rotation points with the first substitution

        # substitution coach factor
        if away.coach.attribute_one == 'substitution' or away.coach.attribute_two == 'substitution':
            substitution = 1
        else:
            substitution = 2

        # if rotation points available, if starter is below sd threshold and lower than rotation option,
        # then replace relevant starter_points
        for idx, player in enumerate(zip(starter_points, starters)):
            if rotation_points:
                if player[0] < (player[1].pv - (substitution * sd)) and player[0] < rotation_points[-1]:
                    starter_points[idx] = rotation_points[-1]
                    del rotation_points[-1]

        # suitor GM factor
        if away.gm.trait == 'suitor':
            away_points = sum(starter_points)
        else:
            # needs list as passes queryset
            away_points = sum(starter_points) + suit_bonus(list(suit_list))

        '''__________________________more post_points coaching factors applied_______________________'''

        # underdog coach factor
        if home.coach.attribute_one == 'underdog' or home.coach.attribute_two == 'underdog':
            if home_starters_pv < away_starters_pv:
                home_points = home_points + 0.4 * (away_starters_pv - home_starters_pv)
        if away.coach.attribute_one == 'underdog' or away.coach.attribute_two == 'underdog':
            if away_starters_pv < home_starters_pv:
                away_points = away_points + 0.4 * (home_starters_pv - away_starters_pv)

        # teamwork coach factor
        if home.coach.attribute_one == 'teamwork' or home.coach.attribute_two == 'teamwork':
            home_points += 3
            if home.coach.attribute_one == 'teamwork' and home.coach.attribute_two == 'teamwork':
                home_points += 3
        if away.coach.attribute_one == 'teamwork' or away.coach.attribute_two == 'teamwork':
            away_points += 3
            if away.coach.attribute_one == 'teamwork' and away.coach.attribute_two == 'teamwork':
                away_points += 3

        # clutch coach factor
        if home.coach.attribute_one == 'clutch' or home.coach.attribute_two == 'clutch':
            if home_points < away_points:
                home_points += 6
        if away.coach.attribute_one == 'clutch' or away.coach.attribute_two == 'clutch':
            if away_points < home_points:
                away_points += 6

        return {str(home): home_points, str(away): away_points}

    league_schedule = schedule_creation()
    results = {}
    for series in league_schedule:
        # games per series
        games = 14
        while games > 0:
            results["game" + str(len(results) + 1)] = (simulate_game(series[0], series[1]))
            games -= 1

    results_df = pd.DataFrame(results)
    # get games played
    games_played = results_df.count(axis=1)[0]
    # get wins and create wins column
    winner = results_df.idxmax().to_list()
    for franchise in Franchise.objects.filter(league=league):
        s = Season.objects.get(franchise__franchise=franchise, season=season)
        # get wins
        s.wins = winner.count(franchise.franchise)
        # get losses
        s.losses = games_played - s.wins
        # get ppg
        s.ppg = results_df.mean(axis=1)[franchise.franchise]
        # get std
        s.std = results_df.std(axis=1)[franchise.franchise]
        s.save()
        # create next season object
        s = Season.objects.create(franchise=franchise, season=int(season) + 1)
        s.save()

    # this loop needs to be after so that all the teams have season stats set
    for franchise in Franchise.objects.filter(league=league):
        current_season = Season.objects.get(franchise__franchise=franchise, season=season)
        if season == 1:
            prev_season = current_season
        else:
            prev_season = Season.objects.get(franchise__franchise=franchise, season=(season - 1))

        current_season.championships = prev_season.championships
        # get champion
        if franchise == Season.objects.filter(season=season).order_by('-wins', '-ppg')[0].franchise:
            print(franchise)
            current_season.championships = prev_season.championships + 1

        current_season.save()

    return "Simulated season for " + str(league) + ' season' + str(season)


def offseason(league):
    # apply to all players in the league
    for player in Player.objects.filter(league=league):
        # add one year to age
        player.age += 1
        # add one year to year
        player.year += 1
        # adds 1 with s.d. 1 for players 20 or younger
        if player.age <= 20:
            player.pv = player.pv + random.gauss(1, 1)
        # adds 0 with s.d. 1 for players 21 to 23
        elif 21 <= player.age <= 23:
            player.pv = player.pv + random.gauss(0, 1)
        # subtracts 1 with s.d. 1 for players 24 to 26
        elif 24 <= player.age <= 26:
            player.pv = player.pv + random.gauss(-1, 1)
        # subtracts 2 with s.d. 1 for players 27 to 30
        else:
            player.pv = player.pv + random.gauss(-2, 1)

        if player.trainer:
            player.pv += 1

        # updating epv based on new pv
        player.epv = player.pv + random.gauss(0, 3)
        # updating s_epv based on new pv
        player.s_epv = player.pv + random.gauss(0, 2)

        player.save()

        # if player is over 30 years old they retire or if player pv is below 8 they retire
        if player.age > 30 or player.pv < 8:
            player.delete()

    # for all signed players
    for signed_player in Player.objects.filter(league=league, contract__isnull=False):
        # updating contract years and option years left (once option is zero can be activated)
        if signed_player.contract > 0:
            signed_player.contract -= 1
        if signed_player.t_option is not None:
            if signed_player.t_option > 0:
                signed_player.t_option -= 1
        if signed_player.p_option is not None:
            if signed_player.p_option > 0:
                signed_player.p_option -= 1
        # if contract expires release player from team
        if signed_player.contract == 0:
            signed_player.contract = None
            signed_player.p_option = None
            signed_player.t_option = None
            signed_player.renew = None
            signed_player.grade = None
            signed_player.salary = None
            signed_player.lineup = None
            signed_player.franchise = None
        signed_player.save()

    # degrade stadium by 1, remove gm, remove coach
    for franchise in Franchise.objects.filter(league=league):
        franchise.stadium.grade -= 1
        franchise.stadium.save()
        franchise.gm = None
        franchise.coach = None
        franchise.save()

    return "Successful Offseason for " + league.league_name
