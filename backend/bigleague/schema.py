import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.forms.mutation import DjangoFormMutation
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Staff, Roster


class UserType(DjangoObjectType):
    class Meta:
        model = User


class FranchiseType(DjangoObjectType):
    class Meta:
        model = Franchise


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


class CityType(DjangoObjectType):
    class Meta:
        model = City


class StadiumType(DjangoObjectType):
    class Meta:
        model = Stadium


class GMType(DjangoObjectType):
    class Meta:
        model = GM


class CoachType(DjangoObjectType):
    class Meta:
        model = Coach


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
        player_input = PlayerInput(required=True)

    player = graphene.Field(PlayerType)

    def mutate(self, info, player_input=None):
        player = Player(
            name=player_input.name,
            suit=player_input.suit,
            age=player_input.age,
            pv=player_input.pv,
            epv=player_input.epv,
            s_epv=player_input.s_epv,
        )
        player.save()
        return PlayerMutation(player=player)


class ActionType(DjangoObjectType):
    class Meta:
        model = Action


class SeasonType(DjangoObjectType):
    class Meta:
        model = Season


class StaffType(DjangoObjectType):
    class Meta:
        model = Staff


class RosterType(DjangoObjectType):
    class Meta:
        model = Roster
        convert_choices_to_enum = False


class Mutation(graphene.ObjectType):
    update_league = LeagueMutation.Field()
    create_player = PlayerMutation.Field()


class Query(graphene.ObjectType):
    all_user = graphene.List(UserType)
    all_franchise = graphene.List(FranchiseType)
    all_league = graphene.List(LeagueType)
    all_city = graphene.List(CityType)
    all_stadium = graphene.List(StadiumType)
    all_gm = graphene.List(GMType)
    all_coach = graphene.List(CoachType)
    all_player = graphene.List(PlayerType)
    all_action = graphene.List(ActionType)
    all_season = graphene.List(SeasonType)
    all_staff = graphene.List(StaffType)
    all_roster = graphene.List(RosterType)
    player = graphene.Field(PlayerType)

    def resolve_all_user(self, info, **kwargs):
        return User.objects.all()

    def resolve_all_franchise(self, info, **kwargs):
        return Franchise.objects.all()

    def resolve_all_league(self, info, **kwargs):
        return League.objects.all()

    def resolve_all_city(self, info, **kwargs):
        return City.objects.all()

    def resolve_all_stadium(self, info, **kwargs):
        return City.objects.all()

    def resolve_all_gm(self, info, **kwargs):
        return GM.objects.all()

    def resolve_all_coach(self, info, **kwargs):
        return Coach.objects.all()

    def resolve_all_player(self, info, **kwargs):
        return Player.objects.all()

    def resolve_all_action(self, info, **kwargs):
        return Action.objects.all()

    def resolve_all_staff(self, info, **kwargs):
        return Staff.objects.all()

    def resolve_all_roster(self, info, **kwargs):
        return Roster.objects.all()

    def resolve_all_season(self, info, **kwargs):
        return Season.objects.all()

    def resolve_player(self, info, **kwargs):
        name = kwargs.get('name')

        if name is not None:
            return Player.objects.get(pk=name)

        return None



