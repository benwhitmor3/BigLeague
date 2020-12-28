import os
import sys
sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import random
from random import gauss
import pandas as pd
from faker import Faker
import sqlite3
from .models import *

fake = Faker()

'''——————————————— Variables for Creating the Generation ———————————————'''

# need to make these a get request
year = 1

'''———————————————— Generating Franchises, GMs, Coaches, and Players ————————————————'''


class Players:
    num_of_players = 0

    def __init__(self, name, suit, age, pv, epv, s_epv, contract, p_option, t_option, renew, salary, grade, lineup,
                 trainer):
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
        self.lineup = lineup
        self.trainer = trainer

        Players.num_of_players += 1

    # generates player names with faker package
    def gen_name(self):
        self.name = fake.name()

    # generates age for draft depending on year
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

    # generates scouter epv
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
    def gen_lineup(self):
        lineup_weight = ["starter"] * 5 + ["bench"] * 3 + ["reserve"] * 2
        self.lineup = random.choice(lineup_weight)

    def gen_trainer(self):
        self.trainer = 0

    def __str__(self):
        return (self.name, self.suit, self.age, self.pv, self.epv, self.s_epv, self.contract, self.t_option,
                self.p_option, self.renew, self.salary, self.grade, self.lineup, self.trainer)

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {"name": self.name, "suit": self.suit, "age": self.age, "pv": self.pv, "epv": self.epv,
                "s_epv": self.s_epv, "contract": self.contract, "t_option": self.t_option,
                "p_option": self.p_option, "renew": self.renew, "salary": self.salary, "grade": self.grade,
                "lineup": self.lineup, "trainer": self.trainer}


def generate_players():
    # Generates list of players. Range creates number of players.
    player_list = []
    for i in range(10):
        player = Players("name", "suit", "age", "pv", "epv", "s_epv",
                         "contract", "t_option", "p_option", "renew", "salary", "grade", "lineup", "trainer")
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
        player_list[i].gen_lineup()
        player_list[i].gen_trainer()

    def save_players():
        # Converts list of players to a dictionary and data frame in one go with .to_dict method
        df = pd.DataFrame(p.to_dict() for p in player_list)
        df = df.where(pd.notnull(df), None)
        print(df)
        players = df.to_dict('records')

        model_instances = [Player(
            name=record['name'],
            suit=record['suit'],
            age=record['age'],
            pv=record['pv'],
            epv=record['epv'],
            s_epv=record['s_epv'],
            contract=record['contract'],
            p_option=record['p_option'],
            t_option=record['t_option'],
            renew=record['renew'],
            salary=record['salary'],
            grade=record['grade'],
            lineup=record['lineup'],
            trainer=record['trainer'],
        ) for record in players]

        # Player.objects.filter(name, suit, age, pv, epv, s_epv,
        #  contract, t_option, p_option, renew, salary, grade, lineup).update(model_instances=model_instances)

        Player.objects.bulk_create(model_instances)
        # conn = sqlite3.connect(db)
        # df.to_sql('bigleague_player', conn, if_exists='replace', index=False)

    save_players()
