import pandas as pd
from .expense_functions import season_expenses
from .revenue_functions import season_revenue
from .bot_functions import set_actions, set_ticket_price, set_box_price
from .models import *
from django.db.models import Avg, F


def simulate_game(home, away):
    def sim_player_points(players) -> list:
        return [random.gauss(player.pv, player.franchise.coach.standard_deviation_factor()) for player in players]

    def generate_team_points(franchise):
        starter_points_list = sim_player_points(franchise.starters())
        rotation_points_list = sim_player_points(franchise.rotations())

        team_points = sum(starter_points_list)
        rotation_points_list.sort()  # this is done so can get max rotation points with the first substitution
        for starter, starter_points in zip(franchise.starters(), starter_points_list):
            if rotation_points_list:
                if starter.poor_performance(starter_points) and starter_points < rotation_points_list[-1]:
                    bench_points = rotation_points_list[-1]
                    team_points += bench_points - starter_points
                    rotation_points_list.pop()
        return team_points

    ''''___________________________________Base Team Points____________________________________'''''

    home_points = generate_team_points(home) + home.suit_bonus()
    away_points = generate_team_points(away) + away.suit_bonus()

    '''__________________________more post_points coaching factors applied_______________________'''

    home_points += home.coach.underdog_factor(away)
    away_points += away.coach.underdog_factor(home)

    home_points += home.coach.teamwork_factor()
    away_points += away.coach.teamwork_factor()

    home_points += home.stadium.home_field_advantage_factor(away)

    home_points += home.coach.clutch_factor(home_points, away_points)
    away_points += away.coach.clutch_factor(away_points, home_points)

    return {str(home): home_points, str(away): away_points}


def simulate_season(league: League, season: int):
    """This simulates a season for a league"""

    '''_____________________________________fan_functions___________________________________'''

    def fan_base(curr_season: Season, city_value: int) -> float:
        return (2 * city_value) + curr_season.ppg + curr_season.wins - curr_season.losses \
               + (3 * curr_season.championships) + curr_season.bonuses - curr_season.penalties

    def fan_index(prev_season: Season, curr_season: Season) -> float:
        return (0.7 * curr_season.fan_base) + (0.4 * prev_season.fan_index)

    '''Simulation Starts Here'''
    # set actions for bots
    set_actions(league, season)
    # apply actions selected by league
    apply_actions(league, season)
    # create league schedule
    league_schedule = league.schedule()
    results = {}
    # simulated season
    for series in league_schedule:
        # games per series
        games = 7
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
            previous_season = current_season
        else:
            previous_season = Season.objects.get(franchise__franchise=franchise, franchise__league=league,
                                             season=(season - 1))

        current_season.championships = previous_season.championships
        # get champion
        if franchise == Season.objects.filter(franchise__league=league, season=season).order_by('-wins', '-ppg')[
            0].franchise:
            current_season.championships = previous_season.championships + 1
        # apply fame coaching boost
        current_season.fan_index += franchise.coach.fame_factor()
        # set advertising and prices for bot teams
        if current_season.franchise.user is None:
            set_ticket_price(previous_season, current_season, franchise, games_played)
            set_box_price(previous_season, current_season, franchise)

        # calculate fan base
        current_season.fan_base = fan_base(current_season, franchise.stadium.city.city_value)
        # calculate fan index
        current_season.fan_index = fan_index(previous_season, current_season)

        # calculate season revenue
        current_season.revenue += season_revenue(franchise, previous_season, current_season, season, games_played)

        # calculate season expenses
        current_season.expenses += season_expenses(franchise, current_season, season)

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
        player.develop()
        player.save()
        if player.age > 30 or player.pv < 8:  # retirement criteria
            player.delete()


def contract_progression(league):
    """Progresses all contracts after each season. Once p_option or t_option are zero they are active."""
    players = Player.objects.filter(league=league, contract__isnull=False)

    for player in players:
        player.contract = player.contract - 1 if player.contract > 0 else 0
        player.t_option = player.t_option - 1 if player.t_option is not None and player.t_option > 0 else None
        player.p_option = player.p_option - 1 if player.p_option is not None and player.p_option > 0 else None

        if player.contract == 0:
            player.reset()

        player.save()


def contract_option_true(league):
    """ Determine if an active player option will be accepted.
    Player option is accepted if salary is less than 75% of the average league salary based on EPV.
    Team option is accepted if salary is greater than 125% of the average league salary based on EPV. """

    signed_players = Player.objects.filter(league=league, contract__isnull=False)
    avg_salary_per_epv = signed_players.annotate(salary_per_epv=F('salary') / F('epv')).aggregate(Avg('salary_per_epv'))['salary_per_epv__avg']

    # Player option
    player_options_to_reset = Player.objects.filter(league=league, p_option=0, salary__lt=avg_salary_per_epv * F('epv') * 0.75)
    for player in player_options_to_reset:
        player.reset()
        player.save()

    # Team option (bot franchises only)
    team_options_to_reset = Player.objects.filter(league=league, franchise__user=None, t_option=0, salary__gt=avg_salary_per_epv * F('epv') * 1.25)
    for player in team_options_to_reset:
        player.reset()
        player.save()


def renewal_true(league):
    """Determines if a renewal will be activated——based on pv threshold (top 20%)."""
    num_of_players = Player.objects.filter(league=league).count()
    pv_threshold = Player.objects.filter(league=league).order_by("-pv")[int(0.2 * num_of_players)].pv
    # apply to all players in league with a bot franchise, one year left, and a renewable contract
    for player in Player.objects.filter(league=league, franchise__user=None, contract=1,
                                        renew__in=["non-repeat", "repeat"]):
        if player.pv > pv_threshold:
            player.contract += 1
            if player.renew == "non-repeat":
                player.renew = "no"
            player.save()
        else:
            player.renew = "no"
            player.save()


def franchise_progression(league):
    """Degrade stadium by 1, remove gm, remove coach"""
    for franchise in Franchise.objects.filter(league=league):
        franchise.stadium.grade -= 1
        franchise.stadium.save()
        franchise.gm = None
        franchise.coach = None
        franchise.save()


def apply_actions(league, season_num):

    available_actions = {
        "stadium": {
            "improved_bathrooms": {"boost": 1, "cost": 5_000_000},
            "improved_concessions": {"boost": 1, "cost": 5_000_000},
            "jumbotron": {"boost": 1, "cost": 5_000_000},
            "upscale_bar": {"boost": 1, "cost": 5_000_000},
            "hall_of_fame": {"boost": 2, "cost": 10_000_000},
            "improved_seating": {"boost": 2, "cost": 10_000_000},
            "improved_sound": {"boost": 2, "cost": 10_000_000},
            "party_deck": {"boost": 2, "cost": 10_000_000},
            "wi_fi": {"boost": 2, "cost": 10_000_000},
        },
        "home_field": {
            "easy_runs": {"boost": 1, "cost": 20_000_000},
            "fan_factor": {"boost": 1, "cost": 50_000_000},
        },
        "promotion": {
            "fan_night": {"boost": 6, "cost": 2_000_000},
            "family_game": {"boost": 6, "cost": 2_000_000},
            "door_prizes": {"boost": 6, "cost": 2_000_000},
            "mvp_night": {"boost": 10, "cost": 5_000_000},
            "parade_of_champions": {"boost": 10, "cost": 5_000_000},
        },
    }

    for franchise in Franchise.objects.filter(league=league):
        season = Season.objects.get(franchise__franchise=franchise, franchise__league=league, season=season_num)
        stadium = Stadium.objects.get(franchise=franchise)

        for action_type, actions in available_actions.items():
            for action_name, action_effect in actions.items():
                action = getattr(franchise.action, action_name)
                action_complete = getattr(franchise.action, action_name + "_complete", False)
                if action and not action_complete:
                    boost, cost = action_effect["boost"], action_effect["cost"]
                    if action_type == "stadium":
                        stadium.grade += boost
                        stadium.max_grade += boost
                    elif action_type == "home_field":
                        stadium.home_field_advantage += boost
                    elif action_type == "promotion":
                        season.fan_index += boost
                    season.expenses += cost
                    setattr(franchise.action, action_name + "_complete", True)

        # These are actions that have more custom effects and are hard to standardize
        if franchise.action.fan_favourites:
            stadium.grade += 1
            stadium.max_grade += 1
            season.fan_index += 1
            season.expenses += 10_000_000
            franchise.action.fan_favourites = False

        if franchise.action.gourmet_restaurant and not franchise.action.gourmet_restaurant_complete:
            base_revenue, restaurant_standard_deviation = 10_000_000, 5_000_000
            season.revenue += int(random.gauss(base_revenue, restaurant_standard_deviation))
            season.expenses += 10_000_000
            franchise.action.gourmet_restaurant_complete = True

        if franchise.action.beer_garden:
            season.fan_index += 2
            stadium.home_field_advantage += 1
            season.expenses += 6_000_000
            franchise.action.beer_garden = False

        if franchise.action.naming_rights and not franchise.action.naming_rights_complete:
            base_revenue, naming_standard_deviation = 50_000_000, 25_000_000
            season.revenue += int(random.gauss(base_revenue, naming_standard_deviation))
            franchise.action.naming_rights_complete = True

        if franchise.action.event_planning:
            season.revenue += 5 * stadium.grade * stadium.city.city_value * stadium.seats
            franchise.action.event_planning = False

        season.expenses += franchise.player_set.filter(trainer=True).count() * 5_000_000
        season.save()

        franchise.action.number_of_actions = 2

        stadium.save()
        franchise.action.save()
        franchise.save()


def off_season(league):
    """Combines functions needed that run after the season simulation."""
    development(league)
    renewal_true(league)
    contract_progression(league)
    contract_option_true(league)
    franchise_progression(league)

    return "Successful Offseason for " + league.league_name
