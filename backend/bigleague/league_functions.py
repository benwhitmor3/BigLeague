import random

from .generator import gen_salary, gen_grade
from .models import Player


def sign_players(franchise):
    for player in Player.objects.filter(franchise=franchise, contract__isnull=True):
        print(player)
        # set contract
        player.contract = random.randint(1, 5)
        # set t_option
        if player.contract == 5:
            options = [None, None, None, 1, 2, 3, 4]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 4:
            options = [None, None, None, 1, 2, 3]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 3:
            options = [None, None, 1, 2]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 2:
            options = [None, None, 1]
            player.t_option = random.sample(options, k=1)[0]
        elif player.contract == 1:
            player.t_option = None
        # set p_option
        if player.t_option is None:
            if player.contract == 5:
                options = [None, None, None, 1, 2, 3, 4]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 4:
                options = [None, None, None, 1, 2, 3]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 3:
                options = [None, None, 1, 2]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 2:
                options = [None, 1]
                player.p_option = random.sample(options, k=1)[0]
            elif player.contract == 1:
                player.p_option = None
        else:
            player.p_option = None
        # set renew
        renew_weight = ["no"] * 7 + ["non-repeat"] * 1 + ["repeat"] * 2
        player.renew = random.choice(renew_weight)

        player.salary = gen_salary(player.contract, player.epv, player.renew, player.t_option, player.p_option,
                                   player.age)
        player.grade = gen_grade(player.salary, player.contract, player.epv, player.renew, player.t_option,
                                 player.p_option, player.age)

        player.save()

    return "Signed players for " + franchise.franchise

