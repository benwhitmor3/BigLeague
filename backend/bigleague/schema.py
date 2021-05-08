import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType
from .models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Roster


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


class DeleteUser(graphene.Mutation):
    message = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = User.objects.get(email=kwargs["email"])
        obj.delete()
        return cls("User " + kwargs["email"] + " successfully deleted")


class FranchiseInput(graphene.InputObjectType):
    franchise = graphene.String(required=True)
    gm_id = graphene.ID()
    coach_id = graphene.ID()


class FranchiseType(DjangoObjectType):
    class Meta:
        model = Franchise


class CreateFranchiseMutation(graphene.Mutation):
    class Arguments:
        franchise_input = FranchiseInput(required=True)
        email = graphene.String(required=True)

    franchise = graphene.Field(FranchiseType)
    user = graphene.Field(UserType)

    @staticmethod
    def mutate(self, info, franchise_input=None, **kwargs):
        user = User.objects.get(email=kwargs["email"])
        franchise = Franchise(
            franchise=franchise_input.franchise,
            user=user,
            league=user.league,
            gm_id=franchise_input.gm_id,
            coach_id=franchise_input.coach_id
        )
        franchise.save()
        return CreateFranchiseMutation(franchise=franchise)


class LeagueType(DjangoObjectType):
    class Meta:
        model = League


class CreateLeagueMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        league_name = graphene.String(required=True)
        email = graphene.String(required=True)

    # The class attributes define the response of the mutation
    league_name = graphene.String()
    user = graphene.Field(UserType)

    @staticmethod
    def mutate(self, info, league_name, email):
        user = User.objects.get(email=email)
        league = League(league_name=league_name, user=user)
        league.save()
        # Notice we return an instance of this mutation
        return CreateLeagueMutation(
            league_name=league.league_name,
            user=user
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
    city_id = graphene.ID()
    franchise_id = graphene.ID()


class StadiumType(DjangoObjectType):
    class Meta:
        model = Stadium


class CreateStadiumMutation(graphene.Mutation):
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
            city_id=stadium_input.city_id,
            franchise_id=stadium_input.franchise_id,
        )
        stadium.save()
        return CreateStadiumMutation(stadium=stadium)


class UpdateStadiumMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        stadium_input = StadiumInput(required=True)

    # The class attributes define the response of the mutation
    stadium = graphene.Field(StadiumType)

    @staticmethod
    def mutate(self, info, stadium_input=None):
        stadium = Stadium.objects.get(stadium_name=stadium_input.stadium_name)
        if stadium_input.seats:
            stadium.seats = stadium_input.seats
        if stadium_input.boxes:
            stadium.boxes = stadium_input.boxes
        if stadium_input.grade:
            stadium.grade = stadium_input.grade
        if stadium_input.max_grade:
            stadium.max_grade = stadium_input.max_grade
        if stadium_input.home_field_advantage:
            stadium.home_field_advantage = stadium_input.home_field_advantage
        if stadium_input.city:
            city = City.objects.get(pk=stadium_input.city)
            stadium.city = city
        if stadium_input.franchise:
            franchise = Franchise.objects.get(pk=stadium_input.franchise)
            stadium.franchise = franchise
        stadium.save()
        # Notice we return an instance of this mutation
        return UpdateStadiumMutation(stadium=stadium)


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
    league_id = graphene.ID(required=True)


class UpdatePlayerMutation(graphene.Mutation):
    class Arguments:
        player_input = PlayerInput(required=True)

    player = graphene.Field(PlayerType)

    @staticmethod
    def mutate(self, info, player_input=None):
        obj, player = Player.objects.update_or_create(
            name=player_input.name,
            defaults={
                'name': player_input.name,
                'suit': player_input.suit,
                'age': player_input.age,
                'pv': player_input.pv,
                'epv': player_input.epv,
                's_epv': player_input.s_epv,
                'contract': player_input.contract,
                't_option': player_input.t_option,
                'p_option': player_input.p_option,
                'renew': player_input.renew,
                'salary': player_input.salary,
                'grade': player_input.grade,
                'trainer': player_input.trainer,
                'league_id': player_input.league_id,
            }
        )
        # player = Player(
        #     name=player_input.name,
        #     suit=player_input.suit,
        #     age=player_input.age,
        #     pv=player_input.pv,
        #     epv=player_input.epv,
        #     s_epv=player_input.s_epv,
        #     contract=player_input.contract,
        #     t_option=player_input.t_option,
        #     p_option=player_input.p_option,
        #     renew=player_input.renew,
        #     salary=player_input.salary,
        #     grade=player_input.grade,
        #     trainer=player_input.trainer,
        #     league_id=player_input.league_id,
        # )
        # player.save()
        # return PlayerMutation(player=player)
        return UpdatePlayerMutation(player=obj)


class UpdateFranchiseMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        franchise_input = FranchiseInput(required=True)

    # The class attributes define the response of the mutation
    franchise = graphene.Field(FranchiseType)
    gm = graphene.Field(GMType)
    coach = graphene.Field(CoachType)

    @staticmethod
    def mutate(self, info, franchise_input=None):
        franchise = Franchise.objects.get(pk=franchise_input.franchise)
        if franchise_input.gm:
            gm = GM.objects.get(pk=franchise_input.gm)
        else:
            gm = None
        if franchise_input.coach:
            coach = Coach.objects.get(pk=franchise_input.coach)
        else:
            coach = None
        franchise.gm = gm
        franchise.coach = coach
        franchise.save()
        # Notice we return an instance of this mutation
        return UpdateFranchiseMutation(franchise=franchise, gm=gm, coach=coach)


class ActionType(DjangoObjectType):
    class Meta:
        model = Action


class SeasonType(DjangoObjectType):
    class Meta:
        model = Season


class RosterType(DjangoObjectType):
    class Meta:
        model = Roster
        convert_choices_to_enum = False
        fields = '__all__'


class RosterInput(graphene.InputObjectType):
    player_id = graphene.ID()
    franchise_id = graphene.ID()
    lineup = graphene.String()


class UpdateRosterMutation(graphene.Mutation):
    roster = graphene.Field(RosterType)

    class Arguments:
        roster_input = RosterInput(required=True)

    roster = graphene.Field(RosterType)

    @staticmethod
    def mutate(root, info, roster_input=None):
        # if no franchise given then delete from roster
        if roster_input.franchise_id is None:
            roster = Roster.objects.get(player_id=roster_input.player_id)
            roster.delete()
        else:
            obj, roster = Roster.objects.update_or_create(
                    player_id=roster_input.player_id,
                    defaults={
                        'player_id': roster_input.player_id,
                        'franchise_id': roster_input.franchise_id,
                        'lineup': roster_input.lineup
                    }
                )

            return UpdateRosterMutation(roster=obj)


class Mutation(graphene.ObjectType):

    create_user = CreateUser.Field()
    delete_user = DeleteUser.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    create_league = CreateLeagueMutation.Field()

    create_franchise = CreateFranchiseMutation.Field()
    update_franchise = UpdateFranchiseMutation.Field()

    create_player = UpdatePlayerMutation.Field()

    roster_update = UpdateRosterMutation.Field()

    create_stadium = CreateStadiumMutation.Field()
    update_stadium = UpdateStadiumMutation.Field()


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
    all_roster = graphene.List(RosterType)
    player = graphene.Field(PlayerType)
    roster = graphene.Field(RosterType)
    user = graphene.Field(UserType, email=graphene.String())
    league = graphene.Field(LeagueType, league_name=graphene.String())

    def resolve_all_user(self, info, **kwargs):
        return User.objects.all()

    def resolve_all_franchise(self, info, **kwargs):
        return Franchise.objects.all()

    def resolve_all_league(self, info, **kwargs):
        return League.objects.all()

    def resolve_all_city(self, info, **kwargs):
        return City.objects.all()

    def resolve_all_stadium(self, info, **kwargs):
        return Stadium.objects.all()

    def resolve_all_gm(self, info, **kwargs):
        return GM.objects.all()

    def resolve_all_coach(self, info, **kwargs):
        return Coach.objects.all()

    def resolve_all_player(self, info, **kwargs):
        return Player.objects.all()

    def resolve_all_action(self, info, **kwargs):
        return Action.objects.all()

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

    def resolve_user(self, info, **kwargs):
        email = kwargs.get('email')

        if email is not None:
            return User.objects.get(email=email)

        return None

    def resolve_league(self, info, **kwargs):
        league_name = kwargs.get('league_name')

        if league_name is not None:
            return League.objects.get(league_name=league_name)

        return None
