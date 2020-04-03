import sys
sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import random
from random import gauss
import pandas as pd
from faker import Faker
import sqlite3
from variables import *

desired_width = 200
pd.set_option('display.width', desired_width)
pd.set_option("display.max_columns", 20)

db = '/Users/buw0017/projects/ben_walkthrough/bigleague.db'

num_of_teams = len(team_names)

city_names = ["Los Angeles", "Chicago", "New York", "Phoenix", "Indianapolis", "Philadelphia"]
city_values = [12, 10, 12, 8, 7, 9]
num_of_prospect_classes = 3

fake = Faker()


class Franchise:
    num_of_franchises = 0
    city_names = city_names
    city_values = city_values
    num_of_teams = len(team_names)

    def __init__(self, team, stadium_seats, stadium_boxes, stadium_grade, gm, coach1, coach2, city, city_value):
        self.team = team
        self.stadium_seats = stadium_seats
        self.stadium_boxes = stadium_boxes
        self.stadium_grade = stadium_grade
        self.gm = gm
        self.coach1 = coach1
        self.coach2 = coach2
        self.city = city
        self.city_value = city_value

        Franchise.num_of_franchises += 1

    def gen_team(self):
        self.team = team_names[0]

    # generates random stadium_seats to test
    def gen_stadium_seats(self):
        self.stadium_seats = gauss(30000, 5000)

    # generates random stadium_boxes to test
    def gen_stadium_boxes(self):
        self.stadium_boxes = gauss(100, 10)

    def gen_stadium_grade(self):
        self.stadium_grade = 20

    # generates random gm to test
    def gen_gm(self):
        gm_weight = ['facilitator'] * 10 + ['promoter'] * 10 + ['recruiter'] * 10 + ['scouter'] * 10 + \
                    ['suitor'] * 10 + ['trainer'] * 10
        self.gm = random.choice(gm_weight)

    # generates random coach to test
    def gen_coach1(self):
        coach_weight = ['clutch'] * 10 + ['fame'] * 10 + ['focus'] * 10 + ['guts'] * 10 + \
                       ['momentum'] * 10 + ['substitution'] * 10 + ['teamwork'] * 10 + ['underdog'] * 10 + [
                           'wildcard']
        self.coach1 = random.choice(coach_weight)

    def gen_coach2(self):
        coach_weight = ['clutch'] * 10 + ['fame'] * 10 + ['focus'] * 10 + ['guts'] * 10 + \
                       ['momentum'] * 10 + ['substitution'] * 10 + ['teamwork'] * 10 + ['underdog'] * 10 + [
                           'wildcard']
        self.coach2 = random.choice(coach_weight)

    def gen_city(self):
        city_weight = random.sample(Franchise.city_names, k=1)
        self.city = city_weight[0]

    def gen_city_value(self):
        city_weight = random.sample(Franchise.city_values, k=1)
        self.city_value = city_weight[0]

    def __str__(self):
        return self.team, self.stadium_seats, self.stadium_boxes, self.stadium_grade, self.gm, self.coach1, self.coach2, self.city, self.city_value

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {"team": self.team, "stadium_seats": self.stadium_seats, "stadium_boxes": self.stadium_boxes,
                "stadium_grade": self.stadium_grade,
                "gm": self.gm, "coach1": self.coach1, "coach2": self.coach2, "city": self.city,
                "city_value": self.city_value}


class GM:
    num_of_gm = 0

    def __init__(self, name, trait):
        self.name = name
        self.trait = trait

        GM.num_of_gm += 1

    # generates coach names with faker package
    def gen_name(self):
        self.name = fake.name()

    # generates coach attribute1
    def gen_trait(self):
        trait_weight = ["facilitator"] + ["promoter"] + ["recruiter"] + ["scouter"] + ["suitor"] + ["trainer"]
        self.trait = random.choice(trait_weight)

    def __str__(self):
        return self.name, self.trait

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {"name": self.name, "trait": self.trait}


class Coaches:
    num_of_coaches = 0

    def __init__(self, name, attribute1, attribute2):
        self.name = name
        self.attribute1 = attribute1
        self.attribute2 = attribute2

        Coaches.num_of_coaches += 1

    # generates coach names with faker package
    def gen_name(self):
        self.name = fake.name()

    # generates coach attribute1
    def gen_attribute1(self):
        attribute_weight = ["clutch"] + ["fame"] + ["focus"] + ["guts"] + ["substitution"] + ["teamwork"] + \
                           ["underdog"] + ["wildcard"]
        self.attribute1 = random.choice(attribute_weight)

    # generates coach attribute2
    def gen_attribute2(self):
        attribute_weight = ["clutch"] + ["fame"] + ["focus"] + ["guts"] + ["substitution"] + ["teamwork"] + \
                           ["underdog"] + ["wildcard"]
        self.attribute2 = random.choice(attribute_weight)

    def __str__(self):
        return self.name, self.attribute1, self.attribute2

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {"name": self.name, "attribute1": self.attribute1, "attribute2": self.attribute2}


from variables import *


class Players:
    num_of_players = 0
    team_names = ["alpha", "bravo", "charlie", "delta"]
    num_of_teams = len(team_names)

    def __init__(self, name, suit, age, pv, epv, s_epv, contract, p_option, t_option, renew, salary, grade, team):
        self.name = name
        self.suit = suit
        self.age = age
        self.pv = pv
        self.epv = epv
        self.s_epv = s_epv
        self.contract = contract
        self.p_option = p_option
        self.t_option = t_option
        self.renew = renew
        self.salary = salary
        self.grade = grade
        self.team = team

        Players.num_of_players += 1

    # generates player names with faker package
    def gen_name(self):
        self.name = fake.name()

    # generates age for first draft
    def gen_age(self):
        if year < 2:
            self.age = random.randint(18, 30)
        else:
            self.age = random.randint(18, 22)

    # generates suit for players with weighted choice
    def gen_suit(self):
        suit_weight = ["heart"] * 15 + ["spade"] * 18 + ["club"] * 15 + ["diamond"] * 12
        self.suit = random.choice(suit_weight)

    # generates player value given the suit
    def gen_pv(self):
        sd = 3
        if self.suit == "heart":
            self.pv = gauss(15, sd)
        elif self.suit == "spade":
            self.pv = gauss(18, sd)
        elif self.suit == "club":
            self.pv = gauss(16, sd)
        elif self.suit == "diamond":
            self.pv = gauss(17, sd)

    # generates epv
    def gen_epv(self):
        sd = 3
        self.epv = self.pv + gauss(0, sd)

    def gen_s_epv(self):
        sd = 2
        self.s_epv = self.pv + gauss(0, sd)

    # generates contract range for testing
    def gen_contract(self):
        self.contract = random.randint(0, 5)

    # generates team option for testing
    def gen_t_option(self):
        if self.contract == 5:
            self.t_option = random.randint(0, 4)
        elif self.contract == 4:
            self.t_option = random.randint(0, 3)
        elif self.contract == 3:
            self.t_option = random.randint(0, 2)
        elif self.contract == 2:
            self.t_option = random.randint(0, 1)
        elif self.contract == 1:
            self.t_option = 0
        elif self.contract == 0:
            self.t_option = 0

    # generates player option for testing
    def gen_p_option(self):
        if self.t_option == 0:
            if self.contract == 5:
                self.p_option = random.randint(0, 4)
            elif self.contract == 4:
                self.p_option = random.randint(0, 3)
            elif self.contract == 3:
                self.p_option = random.randint(0, 2)
            elif self.contract == 2:
                self.p_option = random.randint(0, 1)
            elif self.contract == 1:
                self.p_option = 0
            elif self.contract == 0:
                self.p_option = 0
        else:
            self.p_option = 0

    # generates renew contract option for testing
    def gen_renew(self):
        renew_weight = ["no"] * 7 + ["non-repeat"] * 1 + ["repeat"] * 2
        self.renew = random.choice(renew_weight)

    # generates salary (either random ranged salary, or calculated salary to match grade of 5)
    def gen_salary(self):
        # self.salary = random.randint(10, 50)
        # identical to Goegan plan but I had the division for contracts + 1 to help alleviate the high salary for
        # shorter contracts, and "renew repeat" takes 2 points from grade instead of 4.
        # "renew non-repeat" is 1 not 2 now.
        self.grade = 5
        # if contract is greater than zero set salary, then alter it based on renewal:option:age
        if self.contract != 0:
            self.salary = self.grade * (self.epv / (self.contract + 1))
            if self.renew == "repeat":
                self.salary += 2 * (self.epv / (self.contract + 1))
            elif self.renew == "non-repeat":
                self.salary += 1 * (self.epv / (self.contract + 1))

            if self.t_option != 0:
                self.salary += (self.contract - self.t_option) * (self.epv / (self.contract + 1))
            if self.p_option != 0:
                self.salary -= 0.5 * (self.contract - self.p_option) * (self.epv / (self.contract + 1))

            if self.age >= 27:
                self.salary -= (self.age - 26) * (self.epv / (self.contract + 1))
            # this makes options with a zero that are generated as 0 = none, need to keep zero beforehand
            # for salary calculation, 0 means can be activated, empty means never applied
            if self.t_option == 0:
                self.t_option = None
            if self.p_option == 0:
                self.p_option = None
        else:
            self.salary = None

    # generates grade for contract (can be mastered at 5, or calculated given contract length, team and player option,
    # and salary
    def gen_grade(self):
        self.grade = 5

        # if self.contract != 0:
        #     self.grade = (self.salary * (self.contract + 1)) / self.epv
        #     if self.renew == "repeat":
        #         self.grade -= 4
        #     elif self.renew == "non-repeat":
        #         self.grade -= 2
        #
        #     if self.t_option != 0:
        #         self.grade -= (self.contract - self.t_option)
        #     if self.p_option != 0:
        #         self.grade += 0.5*(self.contract - self.p_option)
        #
        #     if self.age >= 27:
        #         self.grade += self.age - 26
        # else:
        #     self.grade = "FA"

    # generates team name with weight choices
    def gen_team(self):
        team_weight = [Players.team_names[0]] * 10 + [Players.team_names[1]] * 10 + [Players.team_names[2]] * 10 + [
            Players.team_names[3]] * 10
        self.team = random.choice(team_weight)

    def __str__(self):
        return (self.name, self.suit, self.age, self.pv, self.epv, self.s_epv, self.contract, self.t_option,
                self.p_option, self.renew, self.salary, self.grade, self.team)

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {"name": self.name, "suit": self.suit, "age": self.age, "pv": self.pv, "epv": self.epv,
                "s_epv": self.s_epv, "contract": self.contract, "t_option": self.t_option,
                "p_option": self.p_option, "renew": self.renew, "salary": self.salary, "grade": self.grade,
                "team": self.team}


def generation():
    franchise_list = []
    for i in range(num_of_teams):
        franchise = Franchise("team", "stadium_seats", "stadium_boxes", "stadium_grade", "gm", "coach1", "coach2",
                              "city", "city_value")
        franchise_list.append(franchise)

    # Gives stats and info for franchise using methods above
    for i in range(Franchise.num_of_franchises):
        franchise_list[i].gen_team()
        franchise_list[i].gen_stadium_seats()
        franchise_list[i].gen_stadium_boxes()
        franchise_list[i].gen_stadium_grade()
        franchise_list[i].gen_gm()
        franchise_list[i].gen_coach1()
        franchise_list[i].gen_coach2()
        franchise_list[i].gen_city()
        franchise_list[i].gen_city_value()
        del team_names[0]

    def save_franchise():
        # Converts list of players to a dictionary and data frame in one go with .to_dict method
        df = pd.DataFrame(f.to_dict() for f in franchise_list)
        df['revenue'] = 0
        df['expenses'] = 0
        print(df)
        conn = sqlite3.connect(db)
        df.to_sql('franchise', conn, if_exists='replace', index=False)

    save_franchise()

    # Generates list of coaches. Range creates number of coaches.
    gm_list = []
    for i in range(20):
        gm = GM("name", "trait")
        gm_list.append(gm)

    # Gives stats and info for players using methods above
    for i in range(GM.num_of_gm):
        gm_list[i].gen_name()
        gm_list[i].gen_trait()

    def save_gm():
        # Converts list of players to a dictionary and data frame in one go with .to_dict method
        df = pd.DataFrame(g.to_dict() for g in gm_list)
        print(df)
        conn = sqlite3.connect(db)
        df.to_sql('gm', conn, if_exists='replace', index=False)

    save_gm()

    # Generates list of coaches. Range creates number of coaches.
    coach_list = []
    for i in range(20):
        coach = Coaches("name", "attribute1", "attribute2")
        coach_list.append(coach)

    # Gives stats and info for players using methods above
    for i in range(Coaches.num_of_coaches):
        coach_list[i].gen_name()
        coach_list[i].gen_attribute1()
        coach_list[i].gen_attribute2()

    def save_coach():
        # Converts list of players to a dictionary and data frame in one go with .to_dict method
        df = pd.DataFrame(c.to_dict() for c in coach_list)
        print(df)
        conn = sqlite3.connect(db)
        df.to_sql('coaches', conn, if_exists='replace', index=False)

    save_coach()

    # Generates list of players. Range creates number of players.
    player_list = []
    for i in range(100):
        player = Players("name", "suit", "age", "pv", "epv", "s_epv",
                         "contract", "t_option", "p_option", "renew", "salary", "grade", "team")
        player_list.append(player)

    # Gives stats and info for players using methods above
    for i in range(Players.num_of_players):
        player_list[i].gen_name()
        player_list[i].gen_suit()
        player_list[i].gen_age()
        player_list[i].gen_pv()
        player_list[i].gen_epv()
        player_list[i].gen_s_epv()
        player_list[i].gen_contract()
        player_list[i].gen_t_option()
        player_list[i].gen_p_option()
        player_list[i].gen_renew()
        player_list[i].gen_grade()
        player_list[i].gen_salary()
        player_list[i].gen_grade()
        player_list[i].gen_team()

    def save_players():
        # Converts list of players to a dictionary and data frame in one go with .to_dict method
        df = pd.DataFrame(p.to_dict() for p in player_list)
        print(df)
        conn = sqlite3.connect(db)
        df.to_sql('players', conn, if_exists='replace', index=False)

    save_players()
