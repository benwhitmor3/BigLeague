import sys
sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend/bigleague/game_code')
import pandas as pd
import sqlite3
import math

db = '/Users/buw0017/projects/TheBigLeagueGame/backend/TheBigLeagueGame.sqlite3'

# this should be front end javascript. No because then can't see other peoples bidding. Need to hit DB?

def gen_salary(contract, epv, renew, t_option, p_option, age):
    salary = 0
    grade = 5
    if contract != 0:
        salary = grade * (epv / (contract + 1))
        if renew == "repeat":
            salary += 2 * (epv / (contract + 1))
        elif renew == "non-repeat":
            salary += 1 * (epv / (contract + 1))
        # need to edit this for now null options
        if t_option != 0:
            salary += (contract - t_option) * (epv / (contract + 1))
        if p_option != 0:
            salary -= 0.5 * (contract - p_option) * (epv / (contract + 1))

        if age >= 27:
            salary -= (age - 26) * (epv / (contract + 1))
        # this makes options with a zero that are generated as 0 = none, need to keep zero beforehand
        # for salary calculation
        if t_option == 0:
            t_option = None
        if p_option == 0:
            p_option = None
    else:
        salary = None

    print(salary)
    
def gen_grade(salary, contract, epv, renew, t_option, p_option, age):

    if contract != 0:
        grade = (salary * (contract + 1)) / epv
        if renew == "repeat":
            grade -= 4
        elif renew == "non-repeat":
            grade -= 2
    
        if t_option != 0:
            grade -= (contract - t_option)
        if p_option != 0:
            grade += 0.5*(contract - p_option)
    
        if age >= 27:
            grade += age - 26
    else:
        grade = None

    return grade


def player_option_true():
    conn = sqlite3.connect(db)
    players = pd.read_sql_query("select * from players", conn)
    conn.close()

    # COULD MAKE THIS POSITION BASED. WOULD BE KIND OF COOL.
    total_salary = 0
    total_epv = 0
    # this sums up salaries and epv for all active/paid players.
    for index, row in players.iterrows():
        if not math.isnan(row.salary):
            total_salary = total_salary + row.salary
            total_epv = total_epv + row.epv

    # makes player option TRUE if salary is less than 75% of average for their EPV
    dollar_to_epv = total_salary / total_epv

    # is the player option activated?
    for index, row in players.iterrows():
        if row.salary/row.epv < (dollar_to_epv*0.75) and row.p_option == 0:
            print(row)
            print(row.salary)
            print(row.salary/row.epv)
            print((dollar_to_epv*0.75))
            print(row.p_option)
