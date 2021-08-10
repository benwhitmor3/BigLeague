import random
from random import gauss
import pandas as pd
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .simulation import schedule_creation, suit_bonus
from .generator import gen_city, gen_gm, gen_coach, gen_player
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

        # create cities, gms, and coaches
        num_of_franchises = int(request.POST.get('num_of_franchises'))
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
            gen_player(league, num_of_franchises * 8, year=0)

        if int(len(league.franchise_set.all())) > 1:
            print("League already has more than one franchise")
        else:
            # create other franchises (36 names)
            franchise_names = ["Aces", "All Stars", "Avengers", "Aztecs", "Big Blues", "Big Red", "Champions",
                               "Crimson",
                               "Dragons", "Devils", "Dream Team", "Elite", "Flames", "Flash", "Force", "Groove",
                               "Heatwave",
                               "Icons", "Jam", "Legends", "Masters", "Monarchy", "Pioneers", "Pride", "Racers",
                               "Rebels",
                               "Royals", "Saints", "Soul", "Spirit", "Storm", "Titans", "United", "Violets", "Voodoo",
                               "Warriors", "Wild"]

            franchise_list = random.sample(franchise_names, k=(num_of_franchises - 1))
            for franchise_name in franchise_list:
                Franchise.objects.create(
                    franchise=franchise_name,
                    league=league
                )
            for franchise in Franchise.objects.all():
                Season.objects.create(franchise=franchise)

        return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/stadium_generation', data={'league_id': '7'})
def stadium_generation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        league_id = request.POST.get('league_id')
        league = League.objects.get(id=league_id)
        cities = City.objects.filter(league=league)

        for franchise in Franchise.objects.filter(league=league, stadium__stadium_name__isnull=True):
            Stadium.objects.create(
                stadium_name=franchise.franchise + ' stadium',
                seats=random.randint(20000, 60000),
                boxes=random.randint(50, 250),
                grade=20,
                max_grade=20,
                home_field_advantage=0,
                city=random.choice(cities),
                franchise=franchise
            )

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
        # get season for league and season number sorted ascending wins, ppg, franchise_id
        franchise_order = sorted(s.filter(franchise__league=league, season=season).values('wins', 'ppg', 'franchise_id',
                                                                                          'franchise_id__franchise'),
                                 key=lambda i: (i['wins'], i['ppg'],
                                                i['franchise_id']))

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
        best_player = {"best_player": sorted(p.filter(league=league).exclude(franchise__isnull=False).values(),
                                             key=lambda i: (i['pv']), reverse=True)[0]['name']}

        return JsonResponse(best_player)


# r = requests.post('http://127.0.0.1:8000/set_lineup', data={'franchise_id': '72'})
def set_lineup_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        franchise_id = request.POST.get('franchise_id')
        franchise = Franchise.objects.get(id=franchise_id)
        league = franchise.league

        franchises = Franchise.objects.filter(league=league)
        # for every franchise not mine, get players and assign lineup based on pv
        for f in franchises:
            if f == franchise:
                print("DON'T EDIT MY FRANCHISE PLEASE")
            else:
                for player in Player.objects.filter(franchise=f).order_by('-pv')[:5]:
                    print(player)
                    player.lineup = "starter"
                    print(player.lineup)
                    player.contract = 5
                    print(player.contract)
                    player.save()
                for player in Player.objects.filter(franchise=f).order_by('-pv')[5:8]:
                    print(player)
                    player.lineup = "rotation"
                    print(player.lineup)
                    player.contract = 3
                    print(player.contract)
                    player.save()
                for player in Player.objects.filter(franchise=f).order_by('-pv')[8:]:
                    print(player)
                    player.lineup = "bench"
                    print(player.lineup)
                    player.contract = 1
                    print(player.contract)
                    player.save()

        return HttpResponse(request)


# r = requests.post('http://127.0.0.1:8000/season_sim', data={'league_id': '7', 'season': 1})
def season_simulation_view(request):
    print('RECEIVED REQUEST: ' + request.method)
    if request.method == 'POST':
        league_id = request.POST.get('league_id')
        franchises = Franchise.objects.filter(league_id=league_id)
        season = request.POST.get('season')

        league_schedule = schedule_creation(franchises)

        results = {}

        for y in range(len(league_schedule)):
            # games per series
            games = 14
            while games > 0:

                '''___________________________________franchise A____________________________________'''

                # focus/guts coach factor
                if league_schedule[y][0].coach.attribute_one == 'guts' \
                        or league_schedule[y][0].coach.attribute_two == 'guts':
                    sd = 14
                elif league_schedule[y][0].coach.attribute_one == 'focus' \
                        or league_schedule[y][0].coach.attribute_two == 'focus':
                    sd = 7
                else:
                    sd = 9

                starters = Player.objects.filter(franchise=league_schedule[y][0], lineup='starter')
                rotation = Player.objects.filter(franchise=league_schedule[y][0], lineup='rotation')

                # sum franchise pv starter_value (used for underdog coach)
                a_starters_pv = sum(
                    Player.objects.filter(franchise=league_schedule[y][0], lineup='starter').values_list('pv',
                                                                                                         flat=True))
                suit_list = Player.objects.filter(franchise=league_schedule[y][0], lineup='starter').values_list('suit',
                                                                                                                 flat=True)

                # Starters
                starter_points = []
                for starter in starters:
                    starter_points.append(gauss(starter.pv, sd))

                # Rotation
                rotation_points = []
                for r in rotation:
                    rotation_points.append(gauss(r.pv, sd))
                rotation_points.sort()  # this is done so can get max rotation points with the first substitution

                # substitution coach factor
                if league_schedule[y][0].coach.attribute_one == 'substitution' \
                        or league_schedule[y][0].coach.attribute_two == 'substitution':
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
                if league_schedule[y][0].gm.trait == 'suitor':
                    a = sum(starter_points)
                else:
                    # needs list as passes queryset
                    a = sum(starter_points) + suit_bonus(list(suit_list))

                '''___________________________________franchise B____________________________________'''

                # focus/guts coach factor
                if league_schedule[y][1].coach.attribute_one == 'guts' \
                        or league_schedule[y][1].coach.attribute_two == 'guts':
                    sd = 14
                elif league_schedule[y][1].coach.attribute_one == 'focus' \
                        or league_schedule[y][1].coach.attribute_two == 'focus':
                    sd = 7
                else:
                    sd = 9

                starters = Player.objects.filter(franchise=league_schedule[y][0], lineup='starter')
                rotation = Player.objects.filter(franchise=league_schedule[y][0], lineup='rotation')

                # sum franchise pv starter_value (used for underdog coach)
                b_starters_pv = sum(
                    Player.objects.filter(franchise=league_schedule[y][1], lineup='starter').values_list('pv',
                                                                                                         flat=True))
                suit_list = Player.objects.filter(franchise=league_schedule[y][1], lineup='starter').values_list('suit',
                                                                                                                 flat=True)

                # Starters
                starter_points = []
                for starter in starters:
                    starter_points.append(gauss(starter.pv, sd))

                # Rotation
                rotation_points = []
                for r in rotation:
                    rotation_points.append(gauss(r.pv, sd))
                rotation_points.sort()  # this is done so can get max rotation points with the first substitution

                # substitution coach factor
                if league_schedule[y][1].coach.attribute_one == 'substitution' \
                        or league_schedule[y][1].coach.attribute_two == 'substitution':
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
                if league_schedule[y][1].gm.trait == 'suitor':
                    b = sum(starter_points)
                else:
                    # needs list as passes queryset
                    b = sum(starter_points) + suit_bonus(list(suit_list))


                '''__________________________more post_points coaching factors applied_______________________'''

                # underdog coach factor
                if league_schedule[y][0].coach.attribute_one == 'underdog' \
                        or league_schedule[y][0].coach.attribute_two == 'underdog':
                    if a_starters_pv < b_starters_pv:
                        a = a + 0.4 * (b_starters_pv - a_starters_pv)
                if league_schedule[y][1].coach.attribute_one == 'underdog' \
                        or league_schedule[y][1].coach.attribute_two == 'underdog':
                    if b_starters_pv < a_starters_pv:
                        b = b + 0.4 * (a_starters_pv - b_starters_pv)

                # teamwork coach factor
                if league_schedule[y][0].coach.attribute_one == 'teamwork' \
                        or league_schedule[y][0].coach.attribute_two == 'teamwork':
                    a = a + 3
                if league_schedule[y][1].coach.attribute_one == 'teamwork' \
                        or league_schedule[y][1].coach.attribute_two == 'teamwork':
                    b = b + 3

                # clutch coach factor
                if league_schedule[y][0].coach.attribute_one == 'clutch' \
                        or league_schedule[y][0].coach.attribute_two == 'clutch':
                    if a < b:
                        a = a + 6
                if league_schedule[y][1].coach.attribute_one == 'clutch' \
                        or league_schedule[y][1].coach.attribute_two == 'clutch':
                    if b < a:
                        b = b + 6

                results["game" + str(len(results) + 1)] = (
                    {str(league_schedule[y][0]): a, str(league_schedule[y][1]): b})

                games -= 1

        results_df = pd.DataFrame(results)
        # get games played
        games_played = results_df.count(axis=1)[0]
        # get wins and create wins column
        winner = results_df.idxmax().to_list()
        for franchise in franchises:
            s = Season.objects.get(franchise__franchise=franchise, season=season)
            # get wins
            s.wins = winner.count(franchise.franchise)
            # get losses
            s.losses = games_played - s.wins
            # get ppg
            s.ppg = results_df.mean(axis=1)[franchise.franchise]
            # get std
            s.std = results_df.std(axis=1)[franchise.franchise]
            s.save()
            # get champion
            if franchise == Season.objects.filter(season=1).order_by('-wins', '-ppg')[0].franchise:
                print(franchise)
                s.championships += 1
            s.save()

    return HttpResponse(request)
