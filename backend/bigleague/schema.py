import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.forms.mutation import DjangoFormMutation
from .models import League, Player


class LeagueType(DjangoObjectType):
    class Meta:
        model = League


class LeagueMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        league_name = graphene.String(required=True)

    # The class attributes define the response of the mutation
    league_name = graphene.Field(LeagueType)

    @staticmethod
    def mutate(self, info, league_name):
        league = League(league_name=league_name)
        league.save()
        # Notice we return an instance of this mutation
        return LeagueMutation(
            league_name=league.league_name
        )


class PlayerType(DjangoObjectType):
    class Meta:
        model = Player


class PlayerInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    suit = graphene.String(required=True)
    age = graphene.Float(required=True)
    pv = graphene.Float(required=True)
    epv = graphene.Float(required=True)
    s_epv = graphene.Float(required=True)


class PlayerMutation(graphene.Mutation):
    class Arguments:
        player_data = PlayerInput(required=True)

    player = graphene.Field(PlayerType)

    @staticmethod
    def mutate(self, info, player_data=None):
        player = Player(
            name=player_data.name,
            suit=player_data.suit,
            age=player_data.age,
            pv=player_data.pv,
            epv=player_data.epv,
            s_epv=player_data.s_epv,
        )
        # player.save()
        return PlayerMutation(player=player)


# class PlayerMutation(graphene.Mutation):
#     class Arguments:
#         name = graphene.String(required=True)
#         suit = graphene.String(required=True)
#         age = graphene.Float(required=True)
#         pv = graphene.Float(required=True)
#         epv = graphene.Float(required=True)
#         s_epv = graphene.Float(required=True)
#
#     player = graphene.Field(lambda: PlayerType)
#
#     @staticmethod
#     def mutate(self, info, name, suit, age, pv, epv, s_epv):
#         player = PlayerType(
#                     name=name,
#                     suit=suit,
#                     age=age,
#                     pv=pv,
#                     epv=epv,
#                     s_epv=s_epv,
#                 )
#         return PlayerMutation(player=player)


class Mutation(graphene.ObjectType):
    update_league = LeagueMutation.Field()
    create_player = PlayerMutation.Field()


class Query(graphene.ObjectType):
    all_league = graphene.List(LeagueType)
    all_player = graphene.List(PlayerType)
    player = graphene.Field(PlayerType)

    def resolve_all_league(self, info, **kwargs):
        return League.objects.all()

    def resolve_all_player(self, info, **kwargs):
        return Player.objects.all()

    def resolve_player(self, info, **kwargs):
        name = kwargs.get('name')

        if name is not None:
            return Player.objects.get(pk=name)

        return None



