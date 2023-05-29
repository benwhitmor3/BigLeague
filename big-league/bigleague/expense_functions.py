from .models import *


def season_expenses(franchise: Franchise, current_season: Season, season: int) -> int:
    total_expenses = 0
    total_expenses += calculate_stadium_construction(franchise, season)
    total_expenses += calculate_stadium_upkeep(franchise, season)
    total_expenses += calculate_operating_cost()
    total_expenses += calculate_advertising_cost(current_season.advertising)
    total_expenses += calculate_salary_cost(franchise)

    return total_expenses


def calculate_stadium_construction(franchise: Franchise, season: int) -> int:
    if season == 1:
        stadium = franchise.stadium
        return (stadium.seats * 15_000) + (stadium.boxes * 500_000)

    return 0


def calculate_stadium_upkeep(franchise: Franchise, season: int) -> int:
    if season > 1:
        stadium = franchise.stadium
        return (stadium.seats * 200) + (stadium.boxes * 20_000) + (stadium.grade * 20_0000)

    return 0


def renovation():
    return "currently done via frontend"


def calculate_operating_cost() -> int:
    return 50_000_000


def calculate_advertising_cost(advertising: int) -> int:
    return int(1_000_000 * (2 ** (advertising - 1)))


def calculate_salary_cost(franchise: Franchise) -> int:
    players = Player.objects.filter(franchise=franchise)
    salary_sum = sum(player.salary for player in players)
    return salary_sum * 1_000_000
