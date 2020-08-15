import sqlite3
from bigleague.models import *
import pandas as pd

db = '/Users/buw0017/projects/TheBigLeagueGame/backend/TheBigLeagueGame.sqlite3'
conn = sqlite3.connect(db)
df = pd.read_sql_query("select * from players", conn)
conn.close()

players = df.to_dict('records')

model_instances = [Player(
    name=record['name'],
    suit=record['suit'],
    age=record['age'],
    pv=record['pv'],
    epv=record['epv'],
    s_epv=record['s_epv']
) for record in players]

Player.objects.filter(name, suit, age, ).update(model_instances=model_instances)

Player.objects.bulk_create(model_instances)
Player.objects.all().delete()
