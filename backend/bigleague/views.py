from django.db import transaction
from django.http import HttpResponse
from rest_framework import viewsets
from .simulation_functions import off_season, simulate_season
from .bot_functions import sign_players, set_lineup, set_staff, free_agency
from .generator import gen_city, gen_gm, gen_coach, gen_player, gen_franchise
from .serializers import UserSerializer, FranchiseSerializer, LeagueSerializer, CitySerializer, StadiumSerializer, \
    GMSerializer, CoachSerializer, PlayerSerializer, ActionSerializer, SeasonSerializer
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season

from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

# Create your views here.
# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        print(request.data)
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


def league_generation_view(request):
    """this creates all of the bots for a league"""
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league
        num_of_franchises = int(request.POST.get('num_of_franchises'))

        with transaction.atomic():
            # create cities, gms, and coaches
            if int(len(league.city_set.all())) > 0:
                print("PlayerHistory already has " + str(len(league.city_set.all())) + " cities")
            else:
                gen_city(league, 10)

            if int(len(league.gm_set.all())) > 0:
                print("PlayerHistory already has " + str(len(league.gm_set.all())) + " gms")
            else:
                gen_gm(league)

            if int(len(league.coach_set.all())) > 0:
                print("PlayerHistory already has " + str(len(league.coach_set.all())) + " coaches")
            else:
                gen_coach(league, num_of_franchises * 2)

            if int(len(league.player_set.all())) > 0:
                print("PlayerHistory already has " + str(len(league.player_set.all())) + " players")
            else:
                gen_player(league, num_of_franchises * 8, rookies=False)

            if int(len(league.franchise_set.all())) > 1:
                print("PlayerHistory already has more than one franchise")
            else:
                gen_franchise(league, num_of_franchises - 1)

        return HttpResponse(request)


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


def set_lineup_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        my_franchise = Franchise.objects.get(id=franchise_id)
        league = my_franchise.league

        franchises = Franchise.objects.filter(league=league, user=None)
        with transaction.atomic():
            # for every franchise not mine, get players and assign lineup based on pv
            for franchise in franchises:
                set_lineup(franchise)

        return HttpResponse(request)


def set_staff_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        my_franchise = Franchise.objects.get(id=franchise_id)
        league = my_franchise.league

        franchises = Franchise.objects.filter(league=league, user=None)
        with transaction.atomic():
            # for every franchise not mine, assign staff
            for franchise in franchises:
                set_staff(league, franchise)

        return HttpResponse(request)


def free_agency_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        season = request.POST.get('season')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league

        with transaction.atomic():
            free_agency(league, int(season))

        return HttpResponse(request)


def season_simulation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        league_id = request.POST.get('league_id')
        league = League.objects.get(id=league_id)
        season = request.POST.get('season')

        with transaction.atomic():
            simulate_season(league, int(season))
            off_season(league)
            gen_player(league, Franchise.objects.filter(league=league).count() * 2, rookies=True)

        return HttpResponse(request)
