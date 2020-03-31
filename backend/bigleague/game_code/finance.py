import sys
sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import numpy as np

def renovation(age):
    return 20000000 * np.log(age + 1)


def fanbase(cv, ppg, wins, losses, champs, bonuses, penalties):
    return (2 * cv) + ppg + wins - losses + (3 * champs) + bonuses - penalties


#need to call the previous year fanindex
def fanindex(fb, fanindex):
    return (0.7 * fb) + 0.4 * fanindex(t-1)
