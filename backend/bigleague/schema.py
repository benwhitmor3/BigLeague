import graphene
from graphene_django.types import DjangoObjectType
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Staff, Roster


class UserType(DjangoObjectType):
    class Meta:
        model = User


class FranchiseInput(graphene.InputObjectType):
    franchise = graphene.String(required=True)
    username = graphene.String(required=True)


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
        convert_choices_to_enum = False


class PlayerInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    suit = graphene.String(required=True)
    age = graphene.Float(required=True)
    pv = graphene.Float(required=True)
    epv = graphene.Float(required=True)
    s_epv = graphene.Float(required=True)
    contract = graphene.Int(default=None)
    t_option = graphene.Int(default=None)
    p_option = graphene.Int(default=None)
    renew = graphene.String(default=None)
    salary = graphene.Float(default=None)
    grade = graphene.Float(default=None)
    trainer = graphene.Boolean(default=False)
    league_name = graphene.String(required=True)


class PlayerMutation(graphene.Mutation):
    class Arguments:
        player_input = PlayerInput(required=True)

    player = graphene.Field(PlayerType)

    @staticmethod
    def mutate(self, info, player_input=None):
        player = Player(
            name=player_input.name,
            suit=player_input.suit,
            age=player_input.age,
            pv=player_input.pv,
            epv=player_input.epv,
            s_epv=player_input.s_epv,
            contract=player_input.contract,
            t_option=player_input.t_option,
            p_option=player_input.p_option,
            renew=player_input.renew,
            salary=player_input.salary,
            grade=player_input.grade,
            trainer=player_input.trainer,
            league_id=player_input.league_name,
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


class RosterInput(graphene.InputObjectType):
    player = graphene.Field(PlayerInput)
    franchise = graphene.Field(FranchiseInput)
    # player = graphene.String()
    # franchise = graphene.String()
    lineup = graphene.String(default="bench")


class RosterMutation(graphene.Mutation):
    roster = graphene.Field(RosterType)

    class Arguments:
        roster_input = RosterInput(required=True)

    roster = graphene.Field(RosterType)

    @staticmethod
    def mutate(root, info, roster_input=None):
        roster = Roster.objects.create(**roster_input)
        # roster = Roster(
        #     player=roster_input.player.name,
        #     franchise=roster_input.franchise.franchise,
        #     lineup=roster_input.lineup
        #                 )
        roster.save()
        return RosterMutation(roster=roster)


class Mutation(graphene.ObjectType):
    update_league = LeagueMutation.Field()
    create_player = PlayerMutation.Field()
    roster_update = RosterMutation.Field()


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
    roster = graphene.Field(RosterType)

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

    # def resolve_roster(self, info, **kwargs):
    #     name = kwargs.get('name')
    #
    #     if name is not None:
    #         return Roster.objects.get(pk=name)
    #
    #     return None



