import random
import pandas as pd
from django.db.models import Sum
from .finance import ticket_revenue_per_season, box_revenue_per_season, merchandise_revenue, tv_revenue, \
    stadium_construction, stadium_upkeep, operating_cost, advertising_cost, salary_cost
from .bot_functions import set_actions, set_advertising, set_ticket_price, set_box_price
from .models import *


def simulate_season(league, season):
    """This simulates a season for a league"""

    '''_____________________________________schedule_function___________________________________'''
    def schedule_creation():
        franchises = Franchise.objects.filter(league=league)
        schedule = []
        # everybody plays each other once schedule
        for base in range(0, franchises.count()):
            for other in range(base + 1, franchises.count()):
                schedule.append([franchises[base], franchises[other]])
        return schedule

    '''_____________________________________suit_function___________________________________'''
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

    '''_____________________________________fan_functions___________________________________'''
    def fan_base(city_value, ppg, wins, losses, championships, bonuses, penalties):
        return (2 * city_value) + ppg + wins - losses + (3 * championships) + bonuses - penalties

    def fan_index(curr_fan_base, prev_fan_index):
        return (0.7 * curr_fan_base) + (0.4 * prev_fan_index)

    '''_____________________________________simulation_functions___________________________________'''
    def simulate_game(home, away):

        ''''___________________________________Home____________________________________'''''
        # focus/guts coach factor
        if home.coach.attribute_one == 'guts' or home.coach.attribute_two == 'guts':
            sd = 14
        elif home.coach.attribute_one == 'focus' or home.coach.attribute_two == 'focus':
            sd = 7
        else:
            sd = 9

        starters = Player.objects.filter(franchise=home, lineup='starter')
        rotation = Player.objects.filter(franchise=home, lineup='rotation')

        # sum franchise pv starter_value (used for underdog coach)
        home_starters_pv = Player.objects.filter(franchise=home, lineup='starter').aggregate(Sum('pv'))['pv__sum']
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
        away_starters_pv = Player.objects.filter(franchise=away, lineup='starter').aggregate(Sum('pv'))['pv__sum']
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

        # home field advantage
        home_points += home.stadium.home_field_advantage
        # road coach factor for away team
        if away.coach.attribute_one == 'road' or away.coach.attribute_two == 'road':
            home_points -= home.stadium.home_field_advantage

        # clutch coach factor
        if home.coach.attribute_one == 'clutch' or home.coach.attribute_two == 'clutch':
            if home_points < away_points:
                home_points += 6
        if away.coach.attribute_one == 'clutch' or away.coach.attribute_two == 'clutch':
            if away_points < home_points:
                away_points += 6

        return {str(home): home_points, str(away): away_points}

    '''Simulation Starts Here'''
    # set actions for bots
    set_actions(league, season)
    # apply actions selected by league
    apply_actions(league, season)
    # create league schedule
    league_schedule = schedule_creation()
    results = {}
    # simulated season
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

    '''Apply simulation results to season'''
    for franchise in Franchise.objects.filter(league=league):
        s = Season.objects.get(franchise__franchise=franchise, franchise__league=league, season=season)
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

    '''Calculate Fan Functions, Champion, and Financial Based on Season Sim'''
    # this loop needs to be after so that all the teams have season stats set
    for franchise in Franchise.objects.filter(league=league):
        current_season = Season.objects.get(franchise__franchise=franchise, franchise__league=league, season=season)
        if season == 1:
            prev_season = current_season
        else:
            prev_season = Season.objects.get(franchise__franchise=franchise, franchise__league=league, season=(season - 1))

        current_season.championships = prev_season.championships
        # get champion
        if franchise == Season.objects.filter(franchise__league=league, season=season).order_by('-wins', '-ppg')[0].franchise:
            current_season.championships = prev_season.championships + 1
        # calculate fan base
        current_season.fan_base = fan_base(franchise.stadium.city.city_value, current_season.ppg, current_season.wins,
                                           current_season.losses, current_season.championships, current_season.bonuses,
                                           current_season.penalties)
        # calculate fan index
        current_season.fan_index = fan_index(current_season.fan_base, prev_season.fan_index)
        # apply fame coaching boost
        if franchise.coach.attribute_one == 'fame':
            current_season.fan_index += 5
        if franchise.coach.attribute_two == 'fame':
            current_season.fan_index += 5
        # set advertising and prices for bot teams
        if current_season.franchise.user is None:
            current_season.advertising = set_advertising()
            current_season.save()
            set_ticket_price(prev_season, current_season, franchise)
            set_box_price(prev_season, current_season, franchise)
        # calculate season revenue
        current_season.revenue += ticket_revenue_per_season(current_season.ticket_price, games_played,
                                                            current_season.advertising, current_season.fan_index,
                                                            franchise.stadium, current_season) \
                                  + box_revenue_per_season(current_season.box_price, current_season.advertising,
                                                           prev_season.fan_index, franchise.stadium, current_season) \
                                  + merchandise_revenue(current_season.advertising, current_season.fan_index) \
                                  + tv_revenue(league, season, games_played)
        # calculate season expenses
        current_season.expenses += stadium_construction(franchise, season) \
                                   + stadium_upkeep(franchise, season) \
                                   + operating_cost() \
                                   + advertising_cost(current_season.advertising) \
                                   + salary_cost(franchise)
        current_season.save()

    '''Player Stats Logged for Historicals'''
    # make player historical player values
    for player in Player.objects.filter(league=league):
        PlayerHistory.objects.create(
            season=season,
            name=player.name,
            suit=player.suit,
            age=player.age,
            pv=player.pv,
            epv=player.epv,
            s_epv=player.s_epv,
            league=league
        )

    return "Simulated season for " + str(league) + ' season' + str(season)


def development(league):
    """Progresses all players after each season. Adds 1 to age and adjusts pv, epv, and s_epv."""
    for player in Player.objects.filter(league=league):
        # add one year to age
        player.age += 1
        # add one year to year
        player.year += 1
        # adds 1 pv with s.d. 1 for players 20 or younger
        if player.age <= 20:
            player.pv = player.pv + random.gauss(1, 1)
        # adds 0 pv with s.d. 1 for players 21 to 23
        elif 21 <= player.age <= 23:
            player.pv = player.pv + random.gauss(0, 1)
        # subtracts 1 pv with s.d. 1 for players 24 to 26
        elif 24 <= player.age <= 26:
            player.pv = player.pv + random.gauss(-1, 1)
        # subtracts 2 pv with s.d. 1 for players 27 to 30
        else:
            player.pv = player.pv + random.gauss(-2, 1)
        # adds 1 pv if trainer active
        if player.trainer:
            player.pv += 1
            player.trainer = False
        # updating epv based on new pv
        sd = 3
        player.epv = player.pv + random.gauss(0, sd)
        # updating s_epv based on new pv
        sd = 2
        player.s_epv = player.pv + random.gauss(0, sd)

        player.save()

        # if player is over 30 years old they retire or if player pv is below 8 they retire
        if player.age > 30 or player.pv < 8:
            player.delete()


def contract_progression(league):
    """Progresses all contracts after each season. Once p_option or t_option are zero they are active."""
    for signed_player in Player.objects.filter(league=league, contract__isnull=False):
        # updating contract and option years (once option is zero it can be activated)
        if signed_player.contract > 0:
            signed_player.contract -= 1
        if signed_player.t_option is not None:
            if signed_player.t_option > 0:
                signed_player.t_option -= 1
        if signed_player.p_option is not None:
            if signed_player.p_option > 0:
                signed_player.p_option -= 1
        # if contract expires release player from franchise
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


def contract_option_true(league):
    # COULD MAKE THIS POSITION BASED. WOULD BE KIND OF COOL. MAYBE NOT ENOUGH PLAYERS
    """Determines if an active player option will be accepted. Team option only applied to bot franchises.
    Player option is accepted if salary is less than 75% of the average league salary based on EPV.
    Team option is accepted if salary is greater than 125% of the average league salary based on EPV."""
    signed_players = Player.objects.filter(league=league, contract__isnull=False)
    total_salary = signed_players.aggregate(Sum('salary'))['salary__sum']
    total_epv = signed_players.aggregate(Sum('epv'))['epv__sum']
    salary_per_epv = total_salary / total_epv
    # player option
    for player in Player.objects.filter(league=league, p_option=0):
        if (player.salary / player.epv) < salary_per_epv * 0.75:
            player.contract = None
            player.p_option = None
            player.t_option = None
            player.renew = None
            player.grade = None
            player.salary = None
            player.lineup = None
            player.franchise = None
            player.save()
    # team option (bot franchises only)
    for player in Player.objects.filter(league=league, franchise__user=None, t_option=0):
        if (player.salary / player.epv) > salary_per_epv * 1.25:
            player.contract = None
            player.p_option = None
            player.t_option = None
            player.renew = None
            player.grade = None
            player.salary = None
            player.lineup = None
            player.franchise = None
            player.save()


def renewal_true(league):
    """Determines if a renewal will be activated——based on pv threshold (top 20%)."""
    num_of_players = Player.objects.filter(league=league).count()
    pv_threshold = Player.objects.filter(league=league).order_by("-pv")[int(0.2*num_of_players)].pv
    # apply to all players in league with a bot franchise, one year left, and a renewable contract
    for player in Player.objects.filter(league=league, franchise__user=None, contract=1, renew__in=["non-repeat", "repeat"]):
        if player.pv > pv_threshold:
            if player.renew == "repeat":
                player.contract += 1
                player.save()
            if player.renew == "non-repeat":
                player.contract += 1
                player.renew = "no"
                player.save()
        else:
            player.renew = "no"
            player.save()


def franchise_progression(league):
    """degrade stadium by 1, remove gm, remove coach"""
    for franchise in Franchise.objects.filter(league=league):
        franchise.stadium.grade -= 1
        franchise.stadium.save()
        franchise.gm = None
        franchise.coach = None
        franchise.save()


def apply_actions(league, season_num):
    """After actions have been selected. Applies factors, expenses, and revenues"""
    for franchise in Franchise.objects.filter(league=league):
        season = Season.objects.get(franchise__franchise=franchise, franchise__league=league, season=season_num)
        stadium = Stadium.objects.get(franchise=franchise)
        # stadium improvement actions (permanent)
        if franchise.action.improved_bathrooms and franchise.action.improved_bathrooms_complete is False:
            stadium.grade += 1
            stadium.max_grade += 1
            stadium.save()
            season.expenses += 5000000
            season.save()
            franchise.action.improved_bathrooms_complete = True
        if franchise.action.improved_concessions and franchise.action.improved_concessions_complete is False:
            stadium.grade += 1
            stadium.max_grade += 1
            stadium.save()
            season.expenses += 5000000
            season.save()
            franchise.action.improved_concessions_complete = True
        if franchise.action.jumbotron and franchise.action.jumbotron_complete is False:
            stadium.grade += 1
            stadium.max_grade += 1
            stadium.save()
            season.expenses += 5000000
            season.save()
            franchise.action.jumbotron_complete = True
        if franchise.action.upscale_bar and franchise.action.upscale_bar_complete is False:
            stadium.grade += 1
            stadium.max_grade += 1
            stadium.save()
            season.expenses += 5000000
            season.save()
            franchise.action.upscale_bar_complete = True
        if franchise.action.hall_of_fame and franchise.action.hall_of_fame_complete is False:
            stadium.grade += 2
            stadium.max_grade += 2
            stadium.save()
            season.expenses += 10000000
            season.save()
            franchise.action.hall_of_fame_complete = True
        if franchise.action.improved_seating and franchise.action.improved_seating_complete is False:
            stadium.grade += 2
            stadium.max_grade += 2
            stadium.save()
            season.expenses += 10000000
            season.save()
            franchise.action.improved_seating_complete = True
        if franchise.action.improved_sound and franchise.action.improved_sound_complete is False:
            stadium.grade += 2
            stadium.max_grade += 2
            stadium.save()
            season.expenses += 10000000
            season.save()
            franchise.action.improved_sound_complete = True
        if franchise.action.party_deck and franchise.action.party_deck_complete is False:
            stadium.grade += 2
            stadium.max_grade += 2
            stadium.save()
            season.expenses += 10000000
            season.save()
            franchise.action.party_deck_complete = True
        if franchise.action.wi_fi and franchise.action.wi_fi_complete is False:
            stadium.grade += 2
            stadium.max_grade += 2
            stadium.save()
            season.expenses += 10000000
            season.save()
            franchise.action.wi_fi_complete = True
        # home field advantages
        if franchise.action.easy_runs and franchise.action.easy_runs_complete is False:
            stadium.home_field_advantage += 1
            stadium.save()
            season.expenses += 20000000
            season.save()
            franchise.action.easy_runs_complete = True
        if franchise.action.fan_factor and franchise.action.fan_factor_complete is False:
            stadium.home_field_advantage += 1
            stadium.save()
            season.expenses += 50000000
            season.save()
            franchise.action.easy_runs_complete = True
        # promotions
        if franchise.action.fan_night:
            season.fan_index += 6
            season.expenses += 2000000
            season.save()
            franchise.action.fan_night = False
        if franchise.action.family_game:
            season.fan_index += 6
            season.expenses += 2000000
            season.save()
            franchise.action.family_game = False
        if franchise.action.door_prizes:
            season.fan_index += 6
            season.expenses += 2000000
            season.save()
            franchise.action.door_prizes = False
        if franchise.action.mvp_night:
            season.fan_index += 10
            season.expenses += 5000000
            season.save()
            franchise.action.mvp_night = False
        if franchise.action.parade_of_champions:
            season.fan_index += 10
            season.expenses += 5000000
            season.save()
            franchise.action.parade_of_champions = False
        # Concessions and Revenue
        if franchise.action.fan_favourites:
            stadium.grade += 1
            stadium.max_grade += 1
            stadium.save()
            season.fan_index += 1
            season.expenses += 10000000
            season.save()
            franchise.action.fan_favourites = False
        if franchise.action.gourmet_restaurant and franchise.action.gourmet_restaurant_complete is False:
            season.revenue += int(random.gauss(10000000, 5000000))
            season.expenses += 10000000
            season.save()
            franchise.action.gourmet_restaurant_complete = True
        if franchise.action.beer_garden:
            season.fan_index += 2
            stadium.home_field_advantage += 1
            stadium.save()
            season.expenses += 6000000
            season.save()
            franchise.action.beer_garden = False
        if franchise.action.naming_rights and franchise.action.naming_rights_complete is False:
            season.revenue += int(random.gauss(50000000, 25000000))
            season.save()
            franchise.action.naming_rights_complete = True
        if franchise.action.event_planning:
            season.revenue += 5 * stadium.grade * stadium.city.city_value * stadium.seats
            season.save()
            franchise.action.event_planning = False

        # expenses for training a player
        season.expenses += franchise.player_set.filter(trainer=True).count() * 5000000
        season.save()

        # reset number of actions to 2
        franchise.action.number_of_actions = 2

        franchise.save()
        franchise.action.save()
        stadium.save()
        season.save()


def off_season(league):
    """Combines functions needed that run after the season simulation."""
    development(league)
    renewal_true(league)
    contract_progression(league)
    contract_option_true(league)
    franchise_progression(league)

    return "Successful Offseason for " + league.league_name
