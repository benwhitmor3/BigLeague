from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator


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
    franchise = models.CharField(max_length=25, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, to_field="username", db_column="username")
    league = models.ForeignKey("League", on_delete=models.CASCADE)
    gm = models.ForeignKey("GM", on_delete=models.SET_NULL, null=True)
    coach = models.OneToOneField("Coach", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.franchise


class League(models.Model):
    league_name = models.CharField(max_length=25, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, to_field="username", db_column="username")

    def __str__(self):
        return self.league_name


class City(models.Model):
    city = models.CharField(max_length=20, unique=True)
    city_value = models.IntegerField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    def __str__(self):
        return self.city


class Stadium(models.Model):
    stadium_name = models.CharField(max_length=20, unique=True)
    seats = models.IntegerField(default=0)
    boxes = models.IntegerField(default=0)
    grade = models.IntegerField(default=20)
    max_grade = models.IntegerField(default=20)
    home_field_advantage = models.IntegerField(default=0)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    franchise = models.OneToOneField(Franchise, on_delete=models.CASCADE)

    def __str__(self):
        return self.stadium_name


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
        unique_together = ("trait", "league")

    def __str__(self):
        return self.trait


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
    name = models.CharField(max_length=30, unique=True)
    attribute_one = models.CharField(max_length=12, choices=Attribute.choices)
    attribute_two = models.CharField(max_length=12, choices=Attribute.choices)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


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
    name = models.CharField(max_length=50, unique=True)
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

    def __str__(self):
        return self.name


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
