import random
import numpy
import pulp as p
from .models import *


def set_lineup(franchise):
    """Set lineups for bots, always just takes the best pv. Ignores suit bonus impact for lineup"""
    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[:5]:
        player.lineup = "starter"
        player.save()
    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[5:8]:
        player.lineup = "rotation"
        player.save()
    for player in Player.objects.filter(franchise=franchise).order_by('-pv')[8:]:
        player.lineup = "bench"
        player.save()


def set_staff(league, franchise):
    """Sets staff for bots. Tries to intelligently pick GM. Random coach"""
    if franchise.gm is None:
        # if franchise has fewer than 4 players on roster
        if franchise.player_set.count() < 4:
            options = 3 * ['scouter'] + 3 * ['recruiter'] + ['trainer']
            franchise.gm = GM.objects.get(league=league, trait=random.choice(options))
        # if franchise has more than than 3 spades
        elif franchise.player_set.filter(suit=Suit.SPADE).count() > 3:
            options = ['suitor']
            franchise.gm = GM.objects.get(league=league, trait=random.choice(options))
        # if franchise has more than 3 young players (22 and younger)
        elif franchise.player_set.filter(age__lt=23).count() > 3:
            options = ['trainer']
            franchise.gm = GM.objects.get(league=league, trait=random.choice(options))
        # if franchise has won a championship
        elif franchise.season_set.filter(championships__gt=0).count() > 1:
            options = 3 * ['promoter'] + 3 * ['facilitator'] + ['scouter'] + ['recruiter'] + ['trainer']
            franchise.gm = GM.objects.get(league=league, trait=random.choice(options))
        else:
            options = ['promoter'] + ['facilitator'] + ['suitor'] + ['scouter'] + ['recruiter'] + ['trainer']
            franchise.gm = GM.objects.get(league=league, trait=random.choice(options))
    if franchise.coach is None:
        franchise.coach = random.choice(Coach.objects.filter(league=league, franchise=None))

    franchise.save()


def sign_players(franchise):
    """Sign players for bots, uses epv threshold (80th, 60th percentile) to determine contract.
    Better players get longer, player-friendly contracts"""

    def good_contract():
        return random.choice([3, 4, 4, 4, 5, 5, 5, 5, 5, 5])

    def average_contract():
        return random.choice([2, 3, 3, 4, 4, 4, 5, 5, 5, 5])

    def random_contract():
        return random.choice([1, 2, 3, 4, 5])

    eighty_percentile_epv = franchise.league.player_epv_by_percentile(80)
    sixty_percentile_epv = franchise.league.player_epv_by_percentile(60)

    # filter for players on a team without a contract
    for player in Player.objects.filter(franchise=franchise, contract__isnull=True):
        # set contract
        if player.epv > eighty_percentile_epv:
            player.contract = good_contract()
        elif player.epv > sixty_percentile_epv:
            player.contract = average_contract()
        else:
            player.contract = random_contract()
        # set t_option and p_option
        if player.contract == 5:
            if player.epv > eighty_percentile_epv:
                options = [None, None, None, None, None, None, None, None, 4, 4]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, None, 3, 4, 4]
                player.p_option = random.choice(options)
            elif player.epv > sixty_percentile_epv:
                options = [None, None, None, None, None, None, 3, 3, 4, 4]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, 3, 3, 4, 4]
                player.p_option = random.choice(options)
            else:
                options = [None, None, None, None, None, None, 2, 3, 3, 4]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, None, 3, 4, 4]
                player.p_option = random.choice(options)
        elif player.contract == 4:
            if player.epv > eighty_percentile_epv:
                options = [None, None, None, None, None, None, None, None, 3, 3]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, None, 2, 3, 3]
                player.p_option = random.choice(options)
            elif player.epv > sixty_percentile_epv:
                options = [None, None, None, None, None, None, 2, 2, 3, 3]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, 2, 2, 3, 3]
                player.p_option = random.choice(options)
            else:
                options = [None, None, None, None, None, None, 2, 2, 3, 3]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, 2, 3, 3, 3]
                player.p_option = random.choice(options)
        elif player.contract == 3:
            if player.epv > eighty_percentile_epv:
                options = [None, None, None, None, None, None, None, 2, 2, 2]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, 1, 2, 2, 2]
                player.p_option = random.choice(options)
            elif player.epv > sixty_percentile_epv:
                options = [None, None, None, None, None, None, None, 1, 2, 2]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, None, 1, 2, 2]
                player.p_option = random.choice(options)
            else:
                options = [None, None, None, None, None, None, 1, 2, 2, 2]
                player.t_option = random.choice(options)
                options = [None, None, None, None, None, None, None, 1, 2, 2]
                player.p_option = random.choice(options)
        elif player.contract == 2:
            options = [None, None, None, None, None, None, None, None, 1, 1]
            player.t_option = random.choice(options)
            options = [None, None, None, None, None, None, None, None, 1, 1]
            player.p_option = random.choice(options)
        else:
            player.t_option = None
            player.p_option = None
        # set renew
        if player.contract == 5:
            if player.age > 23:
                player.renew = "no"
            else:
                if player.epv > eighty_percentile_epv:
                    renew_weight = ["no"] * 5 + ["non-repeat"] * 2 + ["repeat"] * 3
                    player.renew = random.choice(renew_weight)
                elif player.epv > sixty_percentile_epv:
                    renew_weight = ["no"] * 7 + ["non-repeat"] * 1 + ["repeat"] * 2
                    player.renew = random.choice(renew_weight)
                else:
                    renew_weight = ["no"] * 9 + ["non-repeat"] * 1
                    player.renew = random.choice(renew_weight)
        elif player.contract == 4:
            if player.age > 24:
                player.renew = "no"
            else:
                if player.epv > eighty_percentile_epv:
                    renew_weight = ["no"] * 5 + ["non-repeat"] * 2 + ["repeat"] * 3
                    player.renew = random.choice(renew_weight)
                elif player.epv > sixty_percentile_epv:
                    renew_weight = ["no"] * 8 + ["non-repeat"] * 1 + ["repeat"] * 1
                    player.renew = random.choice(renew_weight)
                else:
                    renew_weight = ["no"] * 9 + ["non-repeat"] * 1
                    player.renew = random.choice(renew_weight)
        elif player.contract == 3:
            if player.age > 25:
                player.renew = "no"
            else:
                if player.epv > eighty_percentile_epv:
                    renew_weight = ["no"] * 7 + ["non-repeat"] * 2 + ["repeat"] * 1
                    player.renew = random.choice(renew_weight)
                elif player.epv > sixty_percentile_epv:
                    renew_weight = ["no"] * 8 + ["non-repeat"] * 2
                    player.renew = random.choice(renew_weight)
                else:
                    renew_weight = ["no"] * 9 + ["non-repeat"] * 1
                    player.renew = random.choice(renew_weight)
        elif player.contract == 2:
            if player.age > 26:
                player.renew = "no"
            else:
                if player.epv > eighty_percentile_epv:
                    renew_weight = ["no"] * 7 + ["non-repeat"] * 1 + ["repeat"] * 2
                    player.renew = random.choice(renew_weight)
                elif player.epv > sixty_percentile_epv:
                    renew_weight = ["no"] * 8 + ["non-repeat"] * 2
                    player.renew = random.choice(renew_weight)
                else:
                    renew_weight = ["no"] * 9 + ["non-repeat"] * 1
                    player.renew = random.choice(renew_weight)
        else:
            if player.epv > eighty_percentile_epv:
                renew_weight = ["no"] * 8 + ["non-repeat"] * 1 + ["repeat"] * 1
                player.renew = random.choice(renew_weight)
            elif player.epv > sixty_percentile_epv:
                renew_weight = ["no"] * 8 + ["non-repeat"] * 2
                player.renew = random.choice(renew_weight)
            else:
                renew_weight = ["no"] * 9 + ["non-repeat"] * 1
                player.renew = random.choice(renew_weight)

        player.salary = player.salary_demand()
        player.grade = calculate_grade(franchise, player)
        player.save()


def set_advertising():
    options = [1] + [2] + [3] + [4] * 2 + [5] * 4 + [6] * 8 + [7] * 8 + [8] * 4 + [9] * 2 + [10]
    return random.choice(options)


def set_ticket_price(prev_season, current_season, franchise):
    """Set Ticket Prices to Maximize Revenue. Loops through different capacities to find max revenue at each level.
    Solution based on: https://gist.github.com/vinovator/2e89fd84bc9071ce19e8"""

    revenue_max = {'revenue': 0, 'price': 0, 'demand': 0}
    # known factors
    advertising = current_season.advertising
    grade = franchise.stadium.grade
    # unknown factors (use previous season to estimate fan index for current season)
    fan_index = prev_season.fan_index

    # declare price variable to maximize
    price = p.LpVariable("price", 0)

    # loop through stadium seats in intervals of 1000 and find revenue max for each
    for seats in numpy.arange(0, franchise.stadium.seats + 1000, 1000):
        # Define objective function (to maximize ticket price given seats)
        prob = p.LpProblem("problem", p.LpMaximize)
        prob += (15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * grade - price)
        # Define constraints
        prob += price >= 0
        prob += ((15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * grade - price)) <= int(seats)

        status = prob.solve()
        # make sure we got an optimal solution
        assert status == p.LpStatusOptimal

        max_price = p.value(price)
        demand = int(prob.objective.value())
        revenue = max_price * demand
        if revenue > revenue_max['revenue']:
            revenue_max = {'revenue': revenue, 'price': max_price, 'demand': demand}

    current_season.ticket_price = revenue_max['price']
    current_season.save()


def set_box_price(prev_season, current_season, franchise):
    """Set Box Prices to Maximize Revenue. Loops through different capacities to find max revenue at each level.
    Solution based on: https://gist.github.com/vinovator/2e89fd84bc9071ce19e8"""

    revenue_max = {'revenue': 0, 'price': 0, 'demand': 0}
    # known factors
    advertising = current_season.advertising
    prev_fan_index = prev_season.fan_index
    city_value = franchise.stadium.city.city_value

    # declare price variable to maximize
    price = p.LpVariable("price", 0)

    # loop through stadium boxes in intervals of 10 and find revenue max for each
    for boxes in numpy.arange(0, franchise.stadium.boxes + 10, 10):
        # Define objective function (to maximize ticket price given boxes)
        prob = p.LpProblem("problem", p.LpMaximize)
        prob += ((advertising * prev_fan_index * city_value) / 10) - ((price * city_value) / 10000)
        # Define constraints
        prob += price >= 0
        prob += ((advertising * prev_fan_index * city_value) / 10) - ((price * city_value) / 10000) <= boxes

        status = prob.solve()
        # make sure we got an optimal solution
        assert status == p.LpStatusOptimal

        max_price = p.value(price)
        demand = int(prob.objective.value())
        revenue = max_price * demand
        if revenue > revenue_max['revenue']:
            revenue_max = {'revenue': revenue, 'price': max_price, 'demand': demand}

    current_season.box_price = revenue_max['price']
    current_season.save()


def free_agency(league, season):
    """Free Agency makes bids on the best available players with randomly generated offer grades.
    Worst franchise from last season gets first pick, and will sign players until at least 5 on roster.
    After that additional players will be signed based on chance"""

    # get free agents (filters: in league, not rookies, no contract, and not signed)
    free_agents = Player.objects.filter(league=league, year__gt=1, contract__isnull=True, franchise__isnull=True)
    # order franchise loop by worst franchise from the previous season
    for franchise in Franchise.objects.filter(user=None, league=league, season__season=(season - 1)).order_by(
            'season__wins'):
        # continue signing players will each franchise has 5
        while franchise.player_set.count() < 5:
            signing = free_agents.order_by("-pv")[0]
            signing.franchise = franchise
            signing.grade = random.randint(500, 1000) / 100
            signing.save()

        # now that franchises have 5 players pick additional free agents with chance
        chance = random.randint(0, 100)
        if chance >= 90:
            signing_one = free_agents.order_by("-pv")[0]
            signing_one.franchise = franchise
            signing_one.grade = random.randint(500, 1000) / 100
            signing_one.save()
            signing_two = free_agents.order_by("-pv")[0]
            signing_two.franchise = franchise
            signing_two.grade = random.randint(500, 1000) / 100
            signing_two.save()
        elif chance >= 70:
            signing = free_agents.order_by("-pv")[0]
            signing.franchise = franchise
            signing.grade = random.randint(500, 1000) / 100
            signing.save()


def set_actions(league, season_num):
    """Set actions for bots based on GM selected.
    Facilitator gets two additional actions.
    Promoter unlocks promotion actions.
    Trainer can train players with actions."""
    for franchise in Franchise.objects.filter(league=league, user__isnull=True):
        season = franchise.season_set.get(season=season_num)
        if franchise.gm.trait == 'facilitator':
            franchise.action.number_of_actions += 2
        if franchise.gm.trait == 'promoter':
            if franchise.action.fan_night is False and franchise.action.number_of_actions > 0:
                franchise.action.fan_night = True
                franchise.action.number_of_actions -= 1
            if franchise.action.family_game is False and franchise.action.number_of_actions > 0:
                franchise.action.family_game = True
                franchise.action.number_of_actions -= 1
            if franchise.action.door_prizes is False and franchise.action.number_of_actions > 0:
                franchise.action.door_prizes = True
                franchise.action.number_of_actions -= 1
            if franchise.action.mvp_night is False and season.championships > 0 and franchise.action.number_of_actions > 0:
                franchise.action.mvp_night = True
                franchise.action.number_of_actions -= 1
            if franchise.action.parade_of_champions is False and season.championships > 0 and franchise.action.number_of_actions > 0:
                franchise.action.parade_of_champions = True
                franchise.action.number_of_actions -= 1
        if franchise.gm.trait == 'trainer' and franchise.action.number_of_actions > 0:
            players = franchise.player_set.filter(trainer=False).order_by('-pv')[0:franchise.action.number_of_actions]
            for player in players:
                player.trainer = True
                player.save()
                franchise.action.number_of_actions -= 1

        if franchise.action.improved_bathrooms is False and franchise.action.improved_bathrooms_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.improved_bathrooms = True
            franchise.action.number_of_actions -= 1
        if franchise.action.improved_concessions is False and franchise.action.improved_concessions_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.improved_concessions = True
            franchise.action.number_of_actions -= 1
        if franchise.action.jumbotron is False and franchise.action.jumbotron_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.jumbotron = True
            franchise.action.number_of_actions -= 1
        if franchise.action.upscale_bar is False and franchise.action.upscale_bar_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.upscale_bar = True
            franchise.action.number_of_actions -= 1
        if franchise.action.hall_of_fame is False and franchise.action.hall_of_fame_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.hall_of_fame = True
            franchise.action.number_of_actions -= 1
        if franchise.action.improved_seating is False and franchise.action.improved_seating_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.improved_seating = True
            franchise.action.number_of_actions -= 1
        if franchise.action.improved_sound is False and franchise.action.improved_sound_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.improved_sound = True
            franchise.action.number_of_actions -= 1
        if franchise.action.party_deck is False and franchise.action.party_deck_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.party_deck = True
            franchise.action.number_of_actions -= 1
        if franchise.action.wi_fi is False and franchise.action.wi_fi_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.wi_fi = True
            franchise.action.number_of_actions -= 1

        if franchise.action.fan_favourites is False and franchise.action.number_of_actions > 0:
            franchise.action.fan_favourites = True
            franchise.action.number_of_actions -= 1
        if franchise.action.gourmet_restaurant is False and franchise.action.gourmet_restaurant_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.gourmet_restaurant = True
            franchise.action.number_of_actions -= 1
        if franchise.action.beer_garden is False and franchise.action.number_of_actions > 0:
            franchise.action.beer_garden = True
            franchise.action.number_of_actions -= 1
        if franchise.action.naming_rights is False and franchise.action.naming_rights_complete is False and franchise.action.number_of_actions > 0:
            franchise.action.naming_rights = True
            franchise.action.number_of_actions -= 1
        if franchise.action.event_planning is False and franchise.action.number_of_actions > 0:
            franchise.action.event_planning = True
            franchise.action.number_of_actions -= 1
        franchise.action.save()
