from typing import Optional
from scipy.optimize import minimize
from .expense_functions import calculate_advertising_cost
from .models import *
from itertools import combinations
from .revenue_functions import ticket_demand_per_game, ticket_revenue_per_game, box_demand_per_game, \
    box_revenue_per_game


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
        if spades > 1:
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
        options = []

        if franchise.player_set.count() < 4:
            options.extend(3 * ['scouter'] + 3 * ['recruiter'] + ['trainer'])

        elif franchise.player_set.filter(suit=Suit.SPADE).count() > 3:
            options.append('suitor')

        elif franchise.player_set.filter(age__lt=23).count() > 3:
            options.append('trainer')

        elif franchise.season_set.filter(championships__gt=0).count() > 1:
            options.extend(3 * ['promoter'] + 3 * ['facilitator'] + ['scouter'] + ['recruiter'] + ['trainer'])

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
                return random.choice([4, 5])
            else:
                return random.choice([3, 4, 5])

        if classification == "superstar":
            return random.choice([3, 4, 5])
        if classification == "allstar":
            return random.choice([2, 3, 4, 5])
        if classification == "good":
            return random.choice([1, 2, 3, 4, 5])
        if classification == "average":
            return random.choice([1, 2, 3, 4])

        return random.choice([1, 2, 3])  # below_average

    def generate_team_option(_player: Player) -> Optional[str]:
        classification = _player.classification()
        if classification == "allstar":
            return random.choice([None, None] + [None if _player.contract - 1 <= 0 else _player.contract - 1])
        if classification in ["good", "average"]:
            return random.choice([None, None] + [None if option <= 0 else option for option in
                                                 [_player.contract - 2, _player.contract - 1]])
        return None  # below_average or superstar

    def generate_player_option(_player: Player) -> Optional[int]:
        classification = _player.classification()
        if classification == "superstar":
            return random.choice([None, None] + [None if option <= 0 else option for option in
                                                 [_player.contract - 2, _player.contract - 1]])
        if classification in ["allstar", "good"]:
            return random.choice([None, None] + [None if _player.contract - 1 <= 0 else _player.contract - 1])
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
            return random.choice(["no", "no", "no", "non-repeat", "non-repeat", "repeat", "repeat"])
        if _player.age < 24 and classification in ["good", "average", "below_average"]:
            return random.choice(["no", "no", "no", "non-repeat", "repeat"])

        return random.choice(["no", "no", "no", "no", "no", "no", "repeat", "non-repeat"])

    player.contract = generate_contract_length(player)  # contract length must be set first
    player.t_option = generate_team_option(player)
    player.p_option = generate_player_option(player)
    player.renew = generate_player_renewal(player)

    player.salary = player.salary_demand()
    player.grade = player.contract_grade()

    player.save()


def set_ticket_price(prev_season, current_season, franchise, games_played):
    capacity, grade = franchise.stadium.seats, franchise.stadium.grade
    fan_index = prev_season.fan_index  # use previous season to estimate fan index for current season

    def advertising_expense_per_game(advertising):
        return calculate_advertising_cost(advertising) / games_played

    def profit_per_game(ticket_price, advertising):
        return ticket_revenue_per_game(ticket_price, advertising, fan_index, grade) - advertising_expense_per_game(
            advertising)

    def objective_function(params):
        ticket_price, advertising = params
        return -profit_per_game(ticket_price, advertising)  # minimize the negative profit to maximize profit

    # Define the constraints
    constraints = [
        # Price greater than 0
        {'type': 'ineq', 'fun': lambda params: params[0]},
        # Total seats sold should be less than or equal to capacity
        {'type': 'ineq', 'fun': lambda params: capacity - ticket_demand_per_game(params[0], int(params[1]), fan_index,
                                                                                 grade)},
    ]
    # Define the bounds for price and advertising
    bounds = [(0, None), (1, 10)]  # price can be any positive value, advertising can be between 1 and 10
    # Define starting point or initial guess for the optimization to begin the search
    starting_point = [150, 5]

    result = minimize(objective_function, x0=starting_point, method='SLSQP', bounds=bounds, constraints=constraints)

    optimal_ticket_price, optimal_advertising = result.x
    current_season.advertising = optimal_advertising
    current_season.ticket_price = optimal_ticket_price
    current_season.save()


def set_box_price(prev_season, curr_season, franchise):
    advertising = curr_season.advertising
    fan_index = prev_season.fan_index
    city_value = franchise.stadium.city.city_value
    capacity = franchise.stadium.boxes

    def profit_per_game(box_price):
        return box_revenue_per_game(box_price, advertising, fan_index, city_value)  # revenue=profit since zero expenses

    def objective_function(params):
        box_price = params
        return -profit_per_game(box_price)  # minimize the negative profit to maximize profit

    # Define the constraints
    constraints = [
        # Price greater than 0
        {'type': 'ineq', 'fun': lambda params: params[0]},
        # Total boxes sold should be less than or equal to capacity
        {'type': 'ineq', 'fun': lambda params: capacity - box_demand_per_game(params[0], advertising, fan_index,
                                                                              city_value)},
    ]
    # Define the bounds for box price
    bounds = [(0, None)]  # price can be any positive value
    # Define starting point or initial guess for the optimization to begin the search
    starting_point = [250000]

    result = minimize(objective_function, x0=starting_point, method='SLSQP', bounds=bounds, constraints=constraints)

    optimal_box_price = result.x
    curr_season.box_price = optimal_box_price
    curr_season.save()


def free_agency(league, season):
    """Free Agency makes bids on the best available players with randomly generated offer grades.
    Worst franchise from last season gets first pick, and will sign players until at least 5 on roster.
    After that, additional players will be signed based on chance"""

    def set_player_grade(player):
        if player.classification() in ["superstar", "allstar"]:
            player.grade = random.randint(1000, 1500) / 100
        else:
            player.grade = random.randint(500, 1500) / 100
        player.save()

    free_agents = league.free_agents()
    # use overall value to rank players
    free_agents = sorted(free_agents, key=lambda player: player.overall_value(), reverse=True)

    # order franchises by worst performance in the previous season
    franchises = Franchise.objects.filter(user=None, league=league, season__season=(season - 1)).order_by(
        'season__wins')
    print(free_agents)
    for franchise in franchises:
        # Sign players until franchise has at least 5 on the roster
        while franchise.player_set.count() < 5 and free_agents:
            best_available_player = free_agents[0]
            best_available_player.franchise = franchise
            sign_player(best_available_player)
            free_agents = free_agents[1:]  # Remove signed player from the list

        # additional signings based on chance (don't immediately sign them — allow user to outbid)
        chance = random.randint(0, 100)
        if chance >= 90 and free_agents:
            signings = min(2, len(free_agents))  # sign two free agents unless only one free agent left
            for _ in range(signings):
                best_available_player = free_agents[0]
                best_available_player.franchise = franchise
                set_player_grade(best_available_player)
                free_agents = free_agents[1:]
        elif chance >= 50 and free_agents:
            best_available_player = free_agents[0]
            best_available_player.franchise = franchise
            set_player_grade(best_available_player)
            free_agents = free_agents[1:]


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
