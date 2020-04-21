import requests
import sqlite3
import pandas as pd
import json

conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
df = pd.read_sql_query("select * from players", conn)
conn.close()


url = 'http://127.0.0.1:8000/api/playergeneration/'
requests.post(url, data=df_records, headers=headers)
headers = {'Content-type': 'application/json'}


requests.delete(url)

# get request
dict2 = requests.get('http://127.0.0.1:8000/api/citychoice/')


