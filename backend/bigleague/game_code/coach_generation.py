import random
from random import gauss
import pandas as pd
from faker import Faker

desired_width = 200
pd.set_option('display.width', desired_width)
pd.set_option("display.max_columns", 20)

fake = Faker()


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


def df_update():
    # Converts list of players to a dictionary and data frame in one go with .to_dict method
    df = pd.DataFrame(c.to_dict() for c in coach_list)
    print(df)
    conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
    df.to_sql('coaches', conn, if_exists='replace', index=False)


df_update()

