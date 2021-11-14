"""backend URL Configuration

The `urlpatterns` list routes URLs to  For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from bigleague.views import *
from rest_framework_jwt.views import obtain_jwt_token
from graphene_django.views import GraphQLView
from .schema import schema

router = routers.DefaultRouter()

# router.register(r'users', UserView, 'user_view')
router.register(r'franchises', FranchiseView, 'franchise_view')
router.register(r'leagues', LeagueView, 'league_view')
router.register(r'cities', CityView, 'city_view')
router.register(r'stadiums', StadiumView, 'team_view')
router.register(r'gms', GMView, 'gm_view')
router.register(r'coaches', CoachView, 'coach_view')
router.register(r'players', PlayerView, 'player_view')
router.register(r'actions', ActionView, 'action_view')
router.register(r'seasons', SeasonView, 'season_view')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('league_generation', csrf_exempt(league_generation_view), name='league_generation'),
    path('season_sim', csrf_exempt(season_simulation_view), name='season_sim'),
    path('set_lineup', csrf_exempt(set_lineup_view), name='set_lineup'),
    path('set_staff', csrf_exempt(set_staff_view), name='set_staff'),
    path('sign_players', csrf_exempt(sign_players_view), name='sign_players'),
    path('free_agency', csrf_exempt(free_agency_view), name='free_agency'),
    path('graphql/', csrf_exempt(GraphQLView.as_view(
        graphiql=True,
        schema=schema
    ))),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    ]
