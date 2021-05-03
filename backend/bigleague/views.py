import random

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .generator import gen_city, gen_gm, gen_coach
from .serializers import UserSerializer, FranchiseSerializer, LeagueSerializer, CitySerializer, StadiumSerializer, \
    GMSerializer, CoachSerializer, PlayerSerializer, ActionSerializer, SeasonSerializer, RosterSerializer
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Roster


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


class RosterView(viewsets.ModelViewSet):
    queryset = Roster.objects.all()
    serializer_class = RosterSerializer


# def league_generation_view(request):
#     print('RECEIVED REQUEST: ' + request.method)
#     if request.method == 'POST':
#         print('Hello')
#         print(request.body)
#         print(request.POST.get('key'))
#     else:  # GET
#         print("GoodBye")
#
#     return HttpResponse(request)

def league_generation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league
        if int(len(league.franchise_set.all())) > 1:
            print("League already has more than one franchise")
            return HttpResponse(request)
        # create cities, gms, and coaches
        num_of_franchises = request.POST.get('num_of_franchises')
        gen_city(league, 10)
        gen_gm(league)
        gen_coach(league, int(num_of_franchises)*2)

        # create other franchises (36 names)
        franchise_names = ["Aces", "All Stars", "Avengers", "Aztecs", "Big Blues", "Big Red", "Champions", "Crimson",
                           "Dragons", "Devils", "Dream Team", "Elite", "Flames", "Flash", "Force", "Groove", "Heatwave",
                           "Icons", "Jam", "Legends", "Masters", "Monarchy", "Pioneers", "Pride", "Racers", "Rebels",
                           "Royals", "Saints", "Soul", "Spirit", "Storm", "Titans", "United", "Violets", "Voodoo",
                           "Warriors", "Wild"]

        franchise_list = random.sample(franchise_names, k=(int(num_of_franchises)-1))
        for franchise_name in franchise_list:
            Franchise.objects.create(
                franchise=franchise_name,
                league=league
            )
    else:  # GET
        print("NO GET YET")
    return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/league_generation', data={'franchise_id': '6', 'num_of_teams': '8'})
# data={'franchise_id': '6', 'num_of_teams': '8'}