"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bigleague import views
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from .schema import schema

router = routers.DefaultRouter()

router.register(r'users', views.UserView, 'user_view')
router.register(r'franchises', views.FranchiseView, 'franchise_view')
router.register(r'leagues', views.LeagueView, 'league_view')
router.register(r'cities', views.CityView, 'city_view')
router.register(r'stadiums', views.StadiumView, 'team_view')
router.register(r'gms', views.GMView, 'gm_view')
router.register(r'coaches', views.CoachView, 'coach_view')
router.register(r'players', views.PlayerView, 'player_view')
router.register(r'actions', views.ActionView, 'action_view')
router.register(r'seasons', views.SeasonView, 'season_view')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('league_generation', csrf_exempt(views.league_generation_view), name='league_generation'),
    path('stadium_generation', csrf_exempt(views.stadium_generation_view), name='stadium_generation'),
    path('draft_order', csrf_exempt(views.draft_order_view), name='draft_order'),
    path('draft_optimize', csrf_exempt(views.draft_optimize_view), name='draft_optimize'),
    path('season_sim', csrf_exempt(views.season_simulation_view), name='season_sim'),
    path('set_lineup', csrf_exempt(views.set_lineup_view), name='set_lineup'),
    path('sign_players', csrf_exempt(views.sign_players_view), name='sign_players'),
    path('graphql/', csrf_exempt(GraphQLView.as_view(
        graphiql=True,
        schema=schema
    ))),
    ]
