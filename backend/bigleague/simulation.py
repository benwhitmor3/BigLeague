from bigleague.models import *


def schedule_creation(franchises):
    schedule = []
    for base in range(0, len(franchises)):
        for other in range(base + 1, len(franchises)):
            schedule.append([franchises[base], franchises[other]])
    return schedule


def suit_bonus(suit_list):
    suit_bonus = 0
    spades = suit_list.count("spade")
    hearts = suit_list.count("heart")
    diamonds = suit_list.count("diamond")
    clubs = suit_list.count("club")

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