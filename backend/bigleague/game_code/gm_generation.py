import random
from random import gauss
import pandas as pd
from faker import Faker

desired_width = 200
pd.set_option('display.width', desired_width)
pd.set_option("display.max_columns", 20)

fake = Faker()


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


# Generates list of coaches. Range creates number of coaches.
gm_list = []
for i in range(20):
    gm = GM("name", "trait")
    gm_list.append(gm)

# Gives stats and info for players using methods above
for i in range(GM.num_of_gm):
    gm_list[i].gen_name()
    gm_list[i].gen_trait()

def df_update():
    # Converts list of players to a dictionary and data frame in one go with .to_dict method
    pd.DataFrame(g.to_dict() for g in gm_list)
    print(pd.DataFrame(g.to_dict() for g in gm_list))


df_update()
