import numpy
import pulp as pulp_p
from .models import *
from itertools import combinations


def set_lineup(franchise: Franchise):
    """Use formula to test each 5-person lineup to maximize player.epv with suit_bonus (ignore if GM is suitor).

        FORMULA: combinations = n! / ( r! * (n-r)! ) where n = num_of_players, r = lineup_length

        NOTE: could maximize by pv_sum instead of epv_sum to make bot lineups better
    """

    def estimated_ppg(test_lineup: tuple[Player]) -> tuple[int, int]:
        suit_bonus, epv_sum = 0, 0
        suit_counter = {'spade': 0, 'heart': 0, 'diamond': 0, 'club': 0}
        for player in test_lineup:
            epv_sum += player.epv
            suit_counter[player.suit] += 1
        spades, hearts, diamonds, clubs = suit_counter.values()
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
        return suit_bonus + epv_sum

    def suitor_set_lineup():
        players_sorted_by_epv = franchise.player_set.all().order_by('-epv')
        for starting_player in players_sorted_by_epv[:5]:
            starting_player.lineup = "starter"
            starting_player.save()
        for rotation_player in players_sorted_by_epv[5:8]:
            rotation_player.lineup = "rotation"
            rotation_player.save()
        for bench_player in players_sorted_by_epv[8:]:
            bench_player.lineup = "bench"
            bench_player.save()

    def non_suitor_set_lineup():
        max_points = 0
        for lineup_combination in combinations(franchise.player_set.all(), 5):
            estimated_points = estimated_ppg(lineup_combination)
            if estimated_points > max_points:
                max_points = estimated_points
                best_lineup = lineup_combination
        for player in franchise.player_set.all():  # reset lineups first for .exclude() filter below
            player.lineup = None
            player.save()
        for starting_player in best_lineup:
            starting_player.lineup = "starter"
            starting_player.save()
        for rotation_player in franchise.player_set.exclude(lineup="starter").order_by('-epv')[:3]:
            rotation_player.lineup = "rotation"
            rotation_player.save()
        for bench_player in franchise.player_set.exclude(lineup="starter").exclude(lineup="rotation").order_by('-epv'):
            bench_player.lineup = "bench"
            bench_player.save()

    suitor_set_lineup() if franchise.gm.trait == "suitor" else non_suitor_set_lineup()


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


def sign_players(franchise: Franchise):
    for player in Player.objects.filter(franchise=franchise, contract__isnull=True):
        sign_player(player)


def sign_player(player: Player):
    """Sign player for bots, uses player classification method to determine contract
    Better players get longer, player-friendly contracts"""

    def generate_contract_length(_player: Player) -> int:
        classification = _player.classification()

        if _player.year == 1:  # rookies
            if classification in ["allstar", "superstar"]:
                return random.choice([4, 4, 4, 5, 5, 5, 5, 5, 5, 5])
            else:
                return random.choice([3, 3, 3, 3, 4, 4, 4, 5, 5, 5])

        if classification == "superstar":
            return random.choice([3, 4, 4, 5, 5, 5, 5, 5, 5, 5])
        if classification == "allstar":
            return random.choice([2, 3, 3, 4, 4, 4, 5, 5, 5, 5])
        if classification == "good":
            return random.choice([1, 2, 2, 3, 3, 3, 4, 4, 5, 5])
        if classification == "average":
            return random.choice([1, 2, 2, 2, 3, 3, 3, 4, 4, 5])

        return random.choice([1, 1, 1, 2, 2, 2, 3, 3, 3, 3])  # below_average

    def generate_team_option(_player: Player) -> str | None:
        classification = _player.classification()
        if classification == "allstar":
            return random.choice(8 * [None] + 2 * [None if _player.contract - 1 <= 0 else _player.contract - 1])
        if classification in ["good", "average"]:
            return random.choice(6 * [None] + 2 * [None if option <= 0 else option for option in [_player.contract - 2,
                                                                                                  _player.contract - 1]])
        return None  # below_average or superstar

    def generate_player_option(_player: Player) -> int | None:
        classification = _player.classification()
        if classification == "superstar":
            return random.choice(4 * [None] + 3 * [None if option <= 0 else option for option in [_player.contract - 2,
                                                                                                  _player.contract - 1]])
        if classification in ["allstar", "good"]:
            return random.choice(8 * [None] + 2 * [None if _player.contract - 1 <= 0 else _player.contract - 1])
        return None  # average or below_average

    def generate_player_renewal(_player: Player) -> str:
        classification = _player.classification()
        if (_player.age + _player.contract) >= 30:
            return "no"
        if _player.contract > 3 and _player.age > 23 and classification not in ["superstar", "allstar"]:
            return "no"
        if _player.contract > 2 and _player.age > 27:
            return "no"
        if _player.age < 24 and classification in ["superstar", "allstar"]:
            return random.choice(4 * ["no"] + 3 * ["non-repeat"] + 3 * ["repeat"])
        if _player.age < 24 and classification in ["good", "average", "below_average"]:
            _player.renew = random.choice(6 * ["no"] + 3 * ["non-repeat"] + ["repeat"])

        return random.choice(8 * ["no"] + ["non-repeat"] + ["repeat"])

    player.contract = generate_contract_length(player)  # contract length must be set first
    player.t_option = generate_team_option(player)
    player.p_option = generate_player_option(player)
    player.renew = generate_player_renewal(player)

    player.salary = player.salary_demand()
    player.grade = player.contract_grade()

    player.save()


def set_advertising():
    return random.choice([1] + [2] + [3] + 2 * [4] + 4 * [5] + 8 * [6] + 8 * [7] + 4 * [8] + 2 * [9] + [10])


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
    price = pulp_p.LpVariable("price", 0)

    # loop through stadium seats in intervals of 1000 and find revenue max for each
    for seats in numpy.arange(0, franchise.stadium.seats + 1000, 1000):
        # Define objective function (to maximize ticket price given seats)
        prob = pulp_p.LpProblem("problem", pulp_p.LpMaximize)
        prob += (15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * grade - price)
        # Define constraints
        prob += price >= 0
        prob += ((15 * advertising + 200) * (6 * advertising + 2 * fan_index + 3 * grade - price)) <= int(seats)

        status = prob.solve()
        # make sure we got an optimal solution
        assert status == pulp_p.LpStatusOptimal

        max_price = pulp_p.value(price)
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
    price = pulp_p.LpVariable("price", 0)

    # loop through stadium boxes in intervals of 10 and find revenue max for each
    for boxes in numpy.arange(0, franchise.stadium.boxes + 10, 10):
        # Define objective function (to maximize ticket price given boxes)
        prob = pulp_p.LpProblem("problem", pulp_p.LpMaximize)
        prob += ((advertising * prev_fan_index * city_value) / 10) - ((price * city_value) / 10000)
        # Define constraints
        prob += price >= 0
        prob += ((advertising * prev_fan_index * city_value) / 10) - ((price * city_value) / 10000) <= boxes

        status = prob.solve()
        # make sure we got an optimal solution
        assert status == pulp_p.LpStatusOptimal

        max_price = pulp_p.value(price)
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

    # order franchise loop by worst franchise from the previous season
    for franchise in Franchise.objects.filter(user=None, league=league, season__season=(season - 1)).order_by(
            'season__wins'):
        # continue signing players will each franchise has 5
        while franchise.player_set.count() < 5:
            best_available_player: Player = league.free_agents().order_by("-pv")[0]
            best_available_player.franchise = franchise
            sign_player(best_available_player)

        # now that franchises have 5 players pick additional free agents with chance
        chance = random.randint(0, 100)
        if chance >= 90:
            for signings in range(2):
                best_available_player: Player = league.free_agents().order_by("-pv")[0]
                best_available_player.franchise = franchise
                if best_available_player.classification() in ["superstar", "allstar"]:
                    best_available_player.grade = random.randint(1000, 1500) / 100
                else:
                    best_available_player.grade = random.randint(500, 1500) / 100
                best_available_player.save()
        elif chance >= 50:
            best_available_player: Player = league.free_agents().order_by("-pv")[0]
            best_available_player.franchise = franchise
            if best_available_player.classification() in ["superstar", "allstar"]:
                best_available_player.grade = random.randint(1000, 1500) / 100
            else:
                best_available_player.grade = random.randint(500, 1500) / 100
            best_available_player.save()


def set_actions(league, season_num):
    """Set actions for bots based on GM selected.
    Facilitator gets two additional actions.
    Promoter unlocks promotion actions.
    Trainer can train players with actions."""
    for franchise in Franchise.objects.filter(league=league, user__isnull=True):
        season = franchise.season_set.get(season=season_num)

        franchise.action.number_of_actions += franchise.gm.facilitator_factor()

        if franchise.gm.trait == 'promoter':
            promoter_actions = {
                'fan_night': "",
                'family_game': "",
                'door_prizes': ""
            }
            champion_actions = {
                'mvp_night': "",
                'parade_of_champions': ""
            }
            if season.championships > 0:
                promoter_actions = promoter_actions | champion_actions

            for action_name, _ in promoter_actions.items():
                action = getattr(franchise.action, action_name)
                if action is False and franchise.action.number_of_actions > 0:
                    setattr(franchise.action, action_name, True)
                    franchise.action.number_of_actions -= 1

        franchise.gm.trainer_factor(franchise)  # TODO MAKE TRAINERS PICK BETTER (SMARTER TRAINERS—BETTER PV AND YOUNG)

        available_actions = {  # dictionaries are ordered as of python 3.7
            # stadium improvements
            'improved_bathrooms': "",
            'improved_concessions': "",
            'jumbotron': "",
            'upscale_bar': "",
            'hall_of_fame': "",
            'improved_seating': "",
            'improved_sound': "",
            'party_deck': "",
            'wi_fi': "",
            # concession improvements
            'fan_favourites': "",
            'gourmet_restaurant': "",
            'beer_garden': "",
            'naming_rights': "",
            'event_planning': "",
        }
        for action_name, _ in available_actions.items():
            action = getattr(franchise.action, action_name)
            # use default False for reusable actions without a _complete field
            action_complete = getattr(franchise.action, action_name + "_complete", False)
            if action is False and action_complete is False and franchise.action.number_of_actions > 0:
                setattr(franchise.action, action_name, True)  # _completed fields are set to true in apply_actions()
                franchise.action.number_of_actions -= 1

        franchise.action.save()
