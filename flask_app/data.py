import pymongo 
import simplejson as json
from pprint import pprint
import pandas as pd 


mng_client = pymongo.MongoClient('localhost', 27017)
mng_db = mng_client['SE'] 
collection_gk = 'user' 
db_user = mng_db[collection_gk]
 
def add_users():
    with open('user.json', 'r') as data_file:
        data_user = json.load(data_file)
    
    db_user.remove()
    db_user.insert(data_user)

def add_questions():
    file=pd.read_csv('placement.csv')
    df=pd.DataFrame(file)
    data=[]
    for i in range (0, len(df)):
        obj=dict()
        obj['timestamp'] = str(df['Timestamp'][i])
        obj['ques_email'] = str(df['ques_email'][i])
        obj['category'] = str(df['category'][i])
        obj['question']=str(df['question'][i])
        ans = {'email' : str(df['answer1_email'][i]),'answer' : str(df['Answer1'][i])}
        obj['answer']= [ans]
        data.append(obj)    
    table = mng_db['question']
    table.drop()
    x = table.insert_many(data)

add_users()
add_questions()