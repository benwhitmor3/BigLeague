import random
from random import gauss, sample
import pandas as pd
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets

from .league_functions import sign_players, set_lineup, offseason, simulate_season
from .simulation import schedule_creation, suit_bonus
from .generator import gen_city, gen_gm, gen_coach, gen_player, gen_salary, gen_grade, gen_franchise
from .serializers import UserSerializer, FranchiseSerializer, LeagueSerializer, CitySerializer, StadiumSerializer, \
    GMSerializer, CoachSerializer, PlayerSerializer, ActionSerializer, SeasonSerializer
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season


# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class FranchiseView(viewsets.ModelViewSet):
    queryset = Franchise.objects.all()
    serializer_class = FranchiseSerializer

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    # serializer_class = OwnerSerializer

    # def get_queryset(self):
    #     return self.request.user.leads.all()
    #
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class LeagueView(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer


class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class StadiumView(viewsets.ModelViewSet):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializer


class PlayerView(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class GMView(viewsets.ModelViewSet):
    queryset = GM.objects.all()
    serializer_class = GMSerializer


class CoachView(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer


class ActionView(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer


class SeasonView(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer


# r = requests.post('http://127.0.0.1:8000/league_generation', data={'franchise_id': '64', 'num_of_franchises': 8})
def league_generation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league
        num_of_franchises = int(request.POST.get('num_of_franchises'))

        with transaction.atomic():
            # create cities, gms, and coaches
            if int(len(league.city_set.all())) > 0:
                print("League already has " + str(len(league.city_set.all())) + " cities")
            else:
                gen_city(league, 10)

            if int(len(league.gm_set.all())) > 0:
                print("League already has " + str(len(league.gm_set.all())) + " gms")
            else:
                gen_gm(league)

            if int(len(league.coach_set.all())) > 0:
                print("League already has " + str(len(league.coach_set.all())) + " coaches")
            else:
                gen_coach(league, num_of_franchises * 2)

            if int(len(league.player_set.all())) > 0:
                print("League already has " + str(len(league.player_set.all())) + " players")
            else:
                gen_player(league, num_of_franchises * 8, rookies=False)

            if int(len(league.franchise_set.all())) > 1:
                print("League already has more than one franchise")
            else:
                gen_franchise(league, num_of_franchises-1)

        return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/draft_order', data={'franchise_id': '72', 'season': 1})
def draft_order_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league
        season = request.POST.get('season')

        s = Season.objects.all()
        if season == '1':
            # get season for league and season number sorted ascending wins, ppg, franchise_id for inaugural season
            franchise_order = sorted(
                s.filter(franchise__league=league, season=season).values('wins', 'ppg', 'franchise_id',
                                                                         'franchise_id__franchise'),
                key=lambda i: (i['wins'], i['ppg'], i['franchise_id']))
        else:
            # get season for league and season number sorted ascending wins, ppg, franchise_id
            franchise_order = sorted(
                s.filter(franchise__league=league, season=int(season) - 1).values('wins', 'ppg', 'franchise_id',
                                                                                  'franchise_id__franchise'),
                key=lambda i: (i['wins'], i['ppg'], i['franchise_id']))

        draft_order = []
        for i in franchise_order:
            draft_order.append(i['franchise_id__franchise'])

        return JsonResponse({'draft_order': draft_order})


# r = requests.post('http://127.0.0.1:8000/draft_optimize', data={'franchise_id': '72'})
def draft_optimize_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league

        p = Player.objects.all()
        # get all players in that league without a franchise sorted descending pv
        best_player = {"best_player": sorted(p.filter(league=league, year=1).exclude(franchise__isnull=False).values(),
                                             key=lambda i: (i['pv']), reverse=True)[0]['name']}

        return JsonResponse(best_player)


# r = requests.post('http://127.0.0.1:8000/sign_players', data={'franchise_id': '72'})
def sign_players_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        my_franchise = Franchise.objects.get(id=franchise_id)
        league = my_franchise.league

        franchises = Franchise.objects.filter(league=league, user=None)
        with transaction.atomic():
            # for every franchise not mine, get players assigned to a team and give contract
            for franchise in franchises:
                sign_players(franchise)

        return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/set_lineup', data={'franchise_id': '72'})
def set_lineup_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        my_franchise = Franchise.objects.get(id=franchise_id)
        league = my_franchise.league

        franchises = Franchise.objects.filter(league=league, user=None)
        # for every franchise not mine, get players and assign lineup based on pv
        for franchise in franchises:
            set_lineup(league, franchise)

        return HttpResponse(request)


def free_agency_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        season = request.POST.get('season')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league

        p = Player.objects.all()
        # need season in the filter otherwise it will include multiple seasons
        for franchise in Franchise.objects.filter(user=None, league=league, season__season=int(season)-1).order_by('season__wins'):
            # if franchise has less than 5 players definitely sign a player
            while franchise.player_set.count() < 5:
                # get all players in that league, not rookies, without contracts, and no franchise sorted descending pv
                free_agent_one = \
                    p.filter(league=league, year__gt=1, contract__isnull=True, franchise__isnull=True).order_by("-pv")[0]
                free_agent_one.franchise = franchise
                free_agent_one.lineup = "bench"
                free_agent_one.save()
            # now that franchises have 5 players pick free agents
            chance = random.randint(0, 100)
            if chance >= 90:
                free_agent_one = \
                    p.filter(league=league, year__gt=1, contract__isnull=True, franchise__isnull=True).order_by("-pv")[
                        0]
                free_agent_one.franchise = franchise
                free_agent_one.lineup = "bench"
                free_agent_one.save()
                free_agent_two = \
                    p.filter(league=league, year__gt=1, contract__isnull=True, franchise__isnull=True).order_by("-pv")[
                        0]
                free_agent_two.franchise = franchise
                free_agent_two.lineup = "bench"
                free_agent_two.save()
            elif chance >= 70:
                free_agent_one = \
                    p.filter(league=league, year__gt=1, contract__isnull=True, franchise__isnull=True).order_by("-pv")[
                        0]
                free_agent_one.franchise = franchise
                free_agent_one.lineup = "bench"
                free_agent_one.save()
            else:
                print('franchise ' + franchise.franchise + ' signed nobody')

        return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/season_sim', data={'league_id': '7', 'season': 1})
def season_simulation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        league_id = request.POST.get('league_id')
        league = League.objects.get(id=league_id)
        franchises = Franchise.objects.filter(league_id=league_id)
        season = request.POST.get('season')

        with transaction.atomic():
            simulate_season(league, int(season))

    return HttpResponse(request)


def offseason_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league

        with transaction.atomic():
            offseason(league)

            gen_player(league, Franchise.objects.filter(league=league).count() * 2, rookies=True)

    return HttpResponse(request)