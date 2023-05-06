import random
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Sum


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Franchise(models.Model):
    franchise = models.CharField(max_length=25)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, to_field="username", db_column="username")
    league = models.ForeignKey("League", on_delete=models.CASCADE)
    gm = models.ForeignKey("GM", on_delete=models.SET_NULL, null=True)
    coach = models.OneToOneField("Coach", on_delete=models.SET_NULL, null=True)

    class Meta:
        unique_together = ('franchise', 'league',)

    def __str__(self):
        return self.franchise

    def starters(self):
        return self.player_set.filter(lineup=Lineup.STARTER)

    def starters_pv_sum(self):
        return self.starters().aggregate(Sum('pv'))['pv__sum']

    def rotations(self):
        return self.player_set.filter(lineup=Lineup.ROTATION)

    def suit_bonus(self):
        if self.gm.trait == Trait.SUITOR:
            return 0

        spades = self.starters().filter(suit=Suit.SPADE).count()
        hearts = self.starters().filter(suit=Suit.HEART).count()
        diamonds = self.starters().filter(suit=Suit.DIAMOND).count()
        clubs = self.starters().filter(suit=Suit.CLUB).count()
        suit_bonus = 0
        # spade adjustment
        if spades <= 1:
            suit_bonus += 0
        else:
            suit_bonus -= spades * (spades - 1)
        # heart adjustment
        suit_bonus += hearts * (5 - hearts)
        # diamond adjustment
        if diamonds > 0:
            suit_bonus += 2 - (diamonds - 1)
        # club adjustment
        suit_bonus += (spades * clubs)

        return suit_bonus


class League(models.Model):
    league_name = models.CharField(max_length=25, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, to_field="username", db_column="username")

    def __str__(self):
        return self.league_name

    def free_agents(self):
        return self.player_set.filter(year__gt=1, contract__isnull=True, franchise__isnull=True)

    def schedule(self):
        franchises = self.franchise_set.all()
        schedule = []
        # everybody plays each other once schedule
        for base in range(0, franchises.count()):
            for other in range(base + 1, franchises.count()):
                schedule.append([franchises[base], franchises[other]])
        return schedule

    def player_epv_by_percentile(self, percentile):
        players_by_epv_ascending = self.player_set.all().order_by('epv').values_list('epv', flat=True)
        epv_percentile_index = int(percentile / 100 * self.player_set.count())
        return players_by_epv_ascending[epv_percentile_index]


class City(models.Model):
    city = models.CharField(max_length=20)
    city_value = models.IntegerField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('city', 'league',)

    def __str__(self):
        return self.city


class Stadium(models.Model):
    stadium_name = models.CharField(max_length=20)
    seats = models.IntegerField(default=0)
    boxes = models.IntegerField(default=0)
    grade = models.IntegerField(default=20)
    max_grade = models.IntegerField(default=20)
    home_field_advantage = models.IntegerField(default=0)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    franchise = models.OneToOneField(Franchise, on_delete=models.CASCADE)

    def __str__(self):
        return self.stadium_name

    def home_field_advantage_factor(self, opponent: Franchise) -> int:
        if opponent.coach.attribute_one == Attribute.ROAD or opponent.coach.attribute_two == Attribute.ROAD:
            return 0
        return self.home_field_advantage


class Trait(models.TextChoices):
    FACILITATOR = 'facilitator', 'facilitator'
    PROMOTER = 'promoter', 'promoter'
    RECRUITER = 'recruiter', 'recruiter'
    SCOUTER = 'scouter', 'scouter'
    SUITOR = 'suitor', 'suitor'
    TRAINER = 'trainer', 'trainer'


class GM(models.Model):
    trait = models.CharField(max_length=12, choices=Trait.choices)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('trait', 'league',)

    def __str__(self):
        return self.trait

    def facilitator_factor(self):
        if self.trait == Trait.FACILITATOR:
            return 2
        return 0

    def trainer_factor(self, franchise):
        if self.trait == Trait.TRAINER:
            players = franchise.player_set.filter(trainer=False).order_by('-pv')[0:franchise.action.number_of_actions]
            for player in players:
                player.trainer = True
                player.save()
                franchise.action.number_of_actions -= 1
            franchise.action.save()


class Attribute(models.TextChoices):
    TEAMWORK = 'teamwork', 'teamwork'
    CLUTCH = 'clutch', 'clutch'
    FAME = 'fame', 'fame'
    FOCUS = 'focus', 'focus'
    GUTS = 'guts', 'guts'
    # MOMENTUM = 'momentum', 'momentum'
    SUBSTITUTION = 'substitution', 'substitution'
    UNDERDOG = 'underdog', 'underdog'
    # WILDCARD = 'wildcard', 'wildcard'
    ROAD = 'road', 'road'


class Coach(models.Model):
    name = models.CharField(max_length=30)
    attribute_one = models.CharField(max_length=12, choices=Attribute.choices)
    attribute_two = models.CharField(max_length=12, choices=Attribute.choices)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'league',)

    def __str__(self):
        return self.name

    def standard_deviation_factor(self):
        if self.attribute_one == Attribute.GUTS or self.attribute_two == Attribute.GUTS:
            return 14
        elif self.attribute_one == Attribute.FOCUS or self.attribute_two == Attribute.FOCUS:
            return 7
        return 9

    def substitution_factor(self):
        if self.attribute_one == Attribute.SUBSTITUTION or self.attribute_two == Attribute.SUBSTITUTION:
            return 1
        return 2

    def underdog_factor(self, opponent):
        if self.attribute_one == Attribute.UNDERDOG or self.attribute_two == Attribute.UNDERDOG:
            if self.franchise.starters_pv_sum() < opponent.starters_pv_sum():
                return 0.4 * (opponent.starters_pv_sum() - self.franchise.starters_pv_sum())
        return 0

    def teamwork_factor(self):
        if self.attribute_one == Attribute.TEAMWORK and self.attribute_two == Attribute.TEAMWORK:
            return 6
        if self.attribute_one == Attribute.TEAMWORK or self.attribute_two == Attribute.TEAMWORK:
            return 3
        return 0

    def clutch_factor(self, team_points, opponent_points):
        if self.attribute_one == Attribute.CLUTCH or self.attribute_two == Attribute.CLUTCH:
            if team_points < opponent_points:
                return 6
        return 0

    def fame_factor(self):
        fan_index_boost = 0
        if self.attribute_one == 'fame':
            fan_index_boost += 5
        if self.attribute_two == 'fame':
            fan_index_boost += 5
        return fan_index_boost


class Suit(models.TextChoices):
    DIAMOND = 'diamond', 'diamond'
    SPADE = 'spade', 'spade'
    CLUB = 'club', 'club'
    HEART = 'heart', 'heart'


class Renew(models.TextChoices):
    NO = 'no', 'no'
    NON_REPEAT = 'non-repeat', 'non-repeat'
    REPEAT = 'repeat', 'repeat'


class Lineup(models.TextChoices):
    BENCH = 'bench', 'bench'
    ROTATION = 'rotation', 'rotation'
    STARTER = 'starter', 'starter'


class Player(models.Model):
    name = models.CharField(max_length=50)
    suit = models.CharField(max_length=10, choices=Suit.choices)
    age = models.IntegerField(default=20)
    pv = models.FloatField(default=20)
    epv = models.FloatField(default=20)
    s_epv = models.FloatField(default=20)
    contract = models.IntegerField(blank=True, null=True)
    t_option = models.IntegerField(blank=True, null=True)
    p_option = models.IntegerField(blank=True, null=True)
    renew = models.CharField(max_length=10, choices=Renew.choices, null=True)
    salary = models.FloatField(blank=True, null=True)
    grade = models.FloatField(blank=True, null=True)
    trainer = models.BooleanField(default=False)
    year = models.IntegerField(default=1)
    lineup = models.CharField(max_length=10, choices=Lineup.choices, null=True)
    franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'league',)

    def __str__(self):
        return self.name

    def is_free_agent(self):
        return True if self.year > 1 and self.contract is None and self.franchise is None else False

    def classification(self):
        if self.epv > self.franchise.league.player_epv_by_percentile(90):
            return "superstar"
        if self.epv > self.franchise.league.player_epv_by_percentile(80):
            return "allstar"
        if self.epv > self.franchise.league.player_epv_by_percentile(60):
            return "good"
        if self.epv > self.franchise.league.player_epv_by_percentile(40):
            return "average"
        return "below_average"

    def develop(self):
        self.age, self.year = self.age + 1, self.year + 1

        standard_deviation = 1
        if self.age <= 20:
            self.pv += random.gauss(1, standard_deviation)
        elif 21 <= self.age <= 23:
            self.pv += random.gauss(0, standard_deviation)
        elif 24 <= self.age <= 26:
            self.pv += random.gauss(-1, standard_deviation)
        else:
            self.pv += random.gauss(-2, standard_deviation)

        if self.trainer:
            self.pv += 1
            self.trainer = False

        standard_deviation = 3  # updating epv based on new pv
        self.epv = self.pv + random.gauss(0, standard_deviation)
        standard_deviation = 2  # updating s_epv based on new pv
        self.s_epv = self.pv + random.gauss(0, standard_deviation)

    def reset(self):
        reset_attributes = {
            "contract": None,
            "p_option": None,
            "t_option": None,
            "renew": None,
            "grade": None,
            "salary": None,
            "lineup": None,
            "franchise": None,
        }
        for attribute, reset_value in reset_attributes.items():
            setattr(self, attribute, reset_value)

    def salary_demand(self):
        """Identical to Goegan salaries except:
        1) division for contracts + 1 to help alleviate high salaries for shorter contracts.
        2) "repeat" takes 2 points from grade instead of 4. "non-repeat" takes 1 point from grade instead of 2."""
        grade = 5
        if self.franchise.gm.trait == Trait.RECRUITER:
            grade = 3

        if self.contract != 0:
            salary = grade * (self.epv / (self.contract + 1))
            if self.renew == "repeat":
                salary += 2 * (self.epv / (self.contract + 1))
            elif self.renew == "non-repeat":
                salary += 1 * (self.epv / (self.contract + 1))
            if self.t_option != 0:
                salary += ((self.contract - self.t_option) if self.t_option is not None else 0) * (
                        self.epv / (self.contract + 1))
            if self.p_option != 0:
                salary -= 0.5 * ((self.contract - self.p_option) if self.p_option is not None else 0) * (
                        self.epv / (self.contract + 1))
            if self.age >= 27:
                salary -= (self.age - 26) * (self.epv / (self.contract + 1))
        else:
            salary = None

        return salary

    def contract_grade(self):
        """Identical to Goegan salaries except:
        1) division for contracts + 1 to help alleviate high salaries for shorter contracts.
        2) "repeat" takes 2 points from grade instead of 4. "non-repeat" takes 1 point from grade instead of 2."""
        if self.contract != 0:
            grade = (self.salary * (self.contract + 1)) / self.epv
            if self.renew == "repeat":
                grade -= 2
            elif self.renew == "non-repeat":
                grade -= 1
            if self.t_option:
                if self.t_option > 0:
                    grade -= (self.contract - self.t_option)
            if self.p_option:
                if self.p_option > 0:
                    grade += 0.5 * (self.contract - self.p_option)
            if self.age >= 27:
                grade += self.age - 26
        else:
            grade = None

        if self.franchise.gm.trait == "recruiter":
            grade += 2

        return grade

    def poor_performance(self, points_scored):
        standard_deviation_factor = self.franchise.coach.standard_deviation_factor()
        substitution_factor = self.franchise.coach.substitution_factor()
        if points_scored < (self.pv - substitution_factor * standard_deviation_factor):
            return True
        return False


class PlayerHistory(models.Model):
    season = models.IntegerField(default=1)
    name = models.CharField(max_length=50)
    suit = models.CharField(max_length=10, choices=Suit.choices)
    age = models.IntegerField(default=20)
    pv = models.FloatField(default=20)
    epv = models.FloatField(default=20)
    s_epv = models.FloatField(default=20)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('season', 'name',)

    def __str__(self):
        return self.name


class Action(models.Model):
    # need this id for graphQL MST
    id = models.AutoField(primary_key=True)
    franchise = models.OneToOneField(Franchise, on_delete=models.CASCADE)
    number_of_actions = models.IntegerField(default=2, validators=[MaxValueValidator(5), MinValueValidator(0)])
    # Permanent Stadium Improvements
    improved_bathrooms = models.BooleanField(default=False)
    improved_bathrooms_complete = models.BooleanField(default=False)
    improved_concessions = models.BooleanField(default=False)
    improved_concessions_complete = models.BooleanField(default=False)
    jumbotron = models.BooleanField(default=False)
    jumbotron_complete = models.BooleanField(default=False)
    upscale_bar = models.BooleanField(default=False)
    upscale_bar_complete = models.BooleanField(default=False)
    hall_of_fame = models.BooleanField(default=False)
    hall_of_fame_complete = models.BooleanField(default=False)
    improved_seating = models.BooleanField(default=False)
    improved_seating_complete = models.BooleanField(default=False)
    improved_sound = models.BooleanField(default=False)
    improved_sound_complete = models.BooleanField(default=False)
    party_deck = models.BooleanField(default=False)
    party_deck_complete = models.BooleanField(default=False)
    wi_fi = models.BooleanField(default=False)
    wi_fi_complete = models.BooleanField(default=False)
    # One Season Promotions
    fan_night = models.BooleanField(default=False)
    family_game = models.BooleanField(default=False)
    door_prizes = models.BooleanField(default=False)
    mvp_night = models.BooleanField(default=False)
    parade_of_champions = models.BooleanField(default=False)
    # Home Field Advantages
    bribe_the_refs = models.BooleanField(default=False)
    easy_runs = models.BooleanField(default=False)
    easy_runs_complete = models.BooleanField(default=False)
    fan_factor = models.BooleanField(default=False)
    fan_factor_complete = models.BooleanField(default=False)
    # Player Development
    train_player = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])
    farm_system = models.BooleanField(default=False)
    # Concessions and Revenue
    fan_favourites = models.BooleanField(default=False)
    gourmet_restaurant = models.BooleanField(default=False)
    gourmet_restaurant_complete = models.BooleanField(default=False)
    beer_garden = models.BooleanField(default=False)
    naming_rights = models.BooleanField(default=False)
    naming_rights_complete = models.BooleanField(default=False)
    event_planning = models.BooleanField(default=False)

    def __str__(self):
        return self.franchise.franchise

    # def action_simulator(self, franchise):
    #     print(franchise)


class Season(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE)
    season = models.IntegerField(default=1)
    ready = models.BooleanField(default=False)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ppg = models.FloatField(default=0)
    std = models.FloatField(default=0)
    championships = models.IntegerField(default=0)
    bonuses = models.IntegerField(default=0)
    penalties = models.IntegerField(default=0)
    fan_base = models.FloatField(default=0)
    fan_index = models.FloatField(default=0)
    advertising = models.IntegerField(default=1)
    ticket_price = models.FloatField(default=0)
    tickets_sold = models.FloatField(default=0)
    box_price = models.FloatField(default=0)
    boxes_sold = models.FloatField(default=0)
    revenue = models.FloatField(default=0)
    expenses = models.FloatField(default=0)

    class Meta:
        unique_together = ['franchise', 'season']

    def __str__(self):
        return self.franchise.franchise
