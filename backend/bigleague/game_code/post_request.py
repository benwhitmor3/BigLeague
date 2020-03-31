import requests
import sqlite3
import pandas as pd
import json

conn = sqlite3.connect('/Users/buw0017/projects/ben_walkthrough/bigleague.db')
df = pd.read_sql_query("select * from prospects_year_3", conn)
conn.close()

df = df.to_json()
body = json.dumps(df)


# this one works
body = {
        "one": "benwdd",
        "two": "rei",
        "three": False
    }
body = json.dumps(body)
url = 'http://127.0.0.1:8000/api/bigleague/1'
requests.post(url, data=body, headers=headers)
headers = {'Content-type': 'application/json'}


requests.delete(url)

# get request
dict2 = requests.get('http://127.0.0.1:8000/api/bigleague/')


