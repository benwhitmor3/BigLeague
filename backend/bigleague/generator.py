from bigleague.models import *
import random
from random import gauss
import faker


# manually create user, franchise, and league


def gen_city(league, num_of_cities=8):
    cities = ["Los Angeles", "Chicago", "New York", "Phoenix", "Indianapolis", "Philadelphia", "Houston",
              "San Antonio", "Denver", "Boston", "Las Vegas", "Seattle", "Atalanta", "San Diego"]
    values = [5, 6, 7, 8, 9, 10, 11, 12]
    cities_list = random.sample(cities, k=num_of_cities)

    # City.objects.all().delete()

    # for city in cities_list:
    #     City.objects.update_or_create(
    #         city=city,
    #         defaults={
    #             'city': city,
    #             'city_value': random.choice(values),
    #             'league': league
    #         }
    #     )

    for city in cities_list:
        City.objects.create(
            city=city,
            city_value=random.choice(values),
            league=league
        )


def gen_player(num_of_players=50, year=1):
    # Player.objects.all().delete()

    for players in range(num_of_players):

        if year < 1:
            age = random.randint(18, 30)
        else:
            age = random.randint(18, 22)

        suit = random.choices(['heart', 'spade', 'club', 'diamond'], weights=[15, 18, 15, 12], k=1)[0]

        sd = 3
        if suit == "heart":
            pv = gauss(15, sd)
        elif suit == "spade":
            pv = gauss(18, sd)
        elif suit == "club":
            pv = gauss(16, sd)
        elif suit == "diamond":
            pv = gauss(17, sd)

        epv = pv + gauss(0, sd)

        sd = 2
        s_epv = pv + gauss(0, sd)

        contract = random.randint(0, 5)

        if contract == 5:
            t_option = random.randint(0, 4)
        elif contract == 4:
            t_option = random.randint(0, 3)
        elif contract == 3:
            t_option = random.randint(0, 2)
        elif contract == 2:
            t_option = random.randint(0, 1)
        elif contract == 1:
            t_option = 0
        elif contract == 0:
            t_option = 0

        if t_option == 0:
            if contract == 5:
                p_option = random.randint(0, 4)
            elif contract == 4:
                p_option = random.randint(0, 3)
            elif contract == 3:
                p_option = random.randint(0, 2)
            elif contract == 2:
                p_option = random.randint(0, 1)
            elif contract == 1:
                p_option = 0
            elif contract == 0:
                p_option = 0
        else:
            p_option = 0

        renew = random.choices(['no', 'non-repeat', 'repeat'], weights=[7, 1, 2], k=1)[0]

        # identical to Goegan plan but I had the division for contracts + 1 to help alleviate the high salary for
        # shorter contracts, and "renew repeat" takes 2 points from grade instead of 4.
        # "renew non-repeat" is 1 not 2 now.
        grade = 5
        # if contract is greater than zero set salary, then alter it based on renewal:option:age
        if contract != 0:
            salary = grade * (epv / (contract + 1))
            if renew == "repeat":
                salary += 2 * (epv / (contract + 1))
            elif renew == "non-repeat":
                salary += 1 * (epv / (contract + 1))

            if t_option != 0:
                salary += (contract - t_option) * (epv / (contract + 1))
            if p_option != 0:
                salary -= 0.5 * (contract - p_option) * (epv / (contract + 1))

            if age >= 27:
                salary -= (age - 26) * (epv / (contract + 1))
            # this makes options with a zero that are generated as 0 = none, need to keep zero beforehand
            # for salary calculation, 0 means can be activated, empty means never applied
            if t_option == 0:
                t_option = None
            if p_option == 0:
                p_option = None
        else:
            salary = None

        # if contract != 0:
        #     grade = (salary * (contract + 1)) / epv
        #     if renew == "repeat":
        #         grade -= 4
        #     elif renew == "non-repeat":
        #         grade -= 2
        #
        #     if t_option != 0:
        #         grade -= (contract - t_option)
        #     if p_option != 0:
        #         grade += 0.5*(contract - p_option)
        #
        #     if age >= 27:
        #         grade += age - 26
        # else:
        #     grade = 0

        Player.objects.create(
            name=faker.Faker().name(),
            suit=suit,
            age=age,
            pv=pv,
            epv=epv,
            s_epv=s_epv,
            contract=contract,
            t_option=t_option,
            p_option=p_option,
            renew=renew,
            salary=salary,
            grade=grade,
            trainer=0,
            league=League.objects.all()[0],
        )


def gen_gm(league):
    # GM.objects.all().delete()

    gms = ['facilitator', 'promoter', 'recruiter', 'scouter', 'suitor', 'trainer']

    for trait in gms:
        GM.objects.create(
            trait=trait,
            league=league,
        )


def gen_coach(league, num_of_coaches=10):
    # Coach.objects.all().delete()

    for coach in range(num_of_coaches):
        attribute_one = \
            random.choices(['teamwork', 'clutch', 'fame', 'focus', 'guts', 'substitution', 'underdog', 'wildcard'],
                           k=1)[0]
        attribute_two = \
            random.choices(['teamwork', 'clutch', 'fame', 'focus', 'guts', 'substitution', 'underdog', 'wildcard'],
                           k=1)[0]

        Coach.objects.create(
            name=faker.Faker().name(),
            attribute_one=attribute_one,
            attribute_two=attribute_two,
            league=league,
        )
