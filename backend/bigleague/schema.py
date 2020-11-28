import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Staff, Roster


class UserType(DjangoObjectType):
    class Meta:
        model = User


class CreateUser(graphene.Mutation):
    message = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String()
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        user = User.objects.create_user(
            email=kwargs.get('email'),
            username=kwargs.get('username'),
        )
        user.set_password(kwargs.get('password'))
        user.save()
        return CreateUser(user=user, message="Successfully created user, {}".format(user.username)
                          )


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


class StadiumInput(graphene.InputObjectType):
    stadium_name = graphene.String()
    seats = graphene.Int()
    boxes = graphene.Int()
    grade = graphene.Int()
    max_grade = graphene.Int()
    home_field_advantage = graphene.Int()
    city = graphene.String()
    franchise = graphene.String()


class StadiumType(DjangoObjectType):
    class Meta:
        model = Stadium


class StadiumMutation(graphene.Mutation):
    class Arguments:
        stadium_input = StadiumInput(required=True)

    stadium = graphene.Field(StadiumType)

    @staticmethod
    def mutate(self, info, stadium_input=None):
        stadium = Stadium(
            stadium_name=stadium_input.stadium_name,
            seats=stadium_input.seats,
            boxes=stadium_input.boxes,
            grade=stadium_input.grade,
            max_grade=stadium_input.max_grade,
            home_field_advantage=stadium_input.home_field_advantage,
            city_id=stadium_input.city,
            franchise_id=stadium_input.franchise,
        )
        stadium.save()
        return StadiumMutation(stadium=stadium)


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
    player_name = graphene.String()
    franchise_franchise = graphene.String()
    lineup = graphene.String()


class RosterMutation(graphene.Mutation):
    roster = graphene.Field(RosterType)

    class Arguments:
        roster_input = RosterInput(required=True)

    roster = graphene.Field(RosterType)

    @staticmethod
    def mutate(root, info, roster_input=None):
        roster = Roster(
            player_id=roster_input.player_name,
            franchise_id=roster_input.franchise_franchise,
            lineup=roster_input.lineup
        )
        roster.save()
        return RosterMutation(roster=roster)


class Mutation(graphene.ObjectType):
    update_league = LeagueMutation.Field()
    create_player = PlayerMutation.Field()
    roster_update = RosterMutation.Field()
    create_stadium = StadiumMutation.Field()
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


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
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

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

    def resolve_roster(self, info, **kwargs):
        name = kwargs.get('name')

        if name is not None:
            return Roster.objects.get(pk=name)

        return None

    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user
