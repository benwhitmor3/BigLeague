import requests
import sqlite3
import pandas as pd
import json

# get database df and post request results
conn = sqlite3.connect('/Users/buw0017/projects/TheBigLeagueGame/backend/TheBigLeagueGame.sqlite3')
df = pd.read_sql_query("select * from players limit 20", conn)
conn.close()

# post request, can only do one at a time for some reason (post request doesn't accept list)
d = df.to_dict(orient='records')
headers = {'Content-type': 'application/json'}
url = 'http://127.0.0.1:8000/api/players/'
j = json.dumps(d[7])

requests.post(url, data=j, headers=headers)

# get request and change to dataframe
r = requests.get('http://127.0.0.1:8000/api/players/')
x = r.json()
df = pd.DataFrame(x)

# requests.delete(url)
