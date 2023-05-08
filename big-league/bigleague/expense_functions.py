from .models import *
from django.db.models import Sum


def season_expenses(franchise: Franchise, current_season: Season, season: int) -> int:
    total_expenses = 0
    total_expenses += stadium_construction(franchise, season)
    total_expenses += stadium_upkeep(franchise, season)
    total_expenses += operating_cost()
    total_expenses += advertising_cost(current_season)
    total_expenses += salary_cost(franchise)

    return total_expenses


def stadium_construction(franchise: Franchise, season: int) -> int:
    if season == 1:
        return (franchise.stadium.seats * 15000) + (franchise.stadium.boxes * 500000)

    return 0


def stadium_upkeep(franchise: Franchise, season: int) -> int:
    if season > 1:
        return (franchise.stadium.seats * 200) + (franchise.stadium.boxes * 20000) + (franchise.stadium.grade * 200000)

    return 0


def renovation():
    return "currently done via frontend"


def operating_cost():
    return 50000000


def advertising_cost(curr_season: Season) -> int:
    return (2 ** (curr_season.advertising - 1)) * 1000000


def salary_cost(franchise: Franchise) -> int:
    return Player.objects.filter(franchise=franchise).aggregate(Sum('salary'))['salary__sum'] * 1000000
