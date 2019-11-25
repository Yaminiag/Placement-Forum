import pymongo 
import simplejson as json
from pprint import pprint
import pandas as pd 


mng_client = pymongo.MongoClient('localhost', 27017)
mng_db = mng_client['SE'] 
collection_gk = 'rating' 
db_user = mng_db[collection_gk]
 
def add_ratings():
    with open('ratings.json', 'r') as data_file:
        data_user = json.load(data_file)
    
    db_user.remove()
    db_user.insert(data_user)

add_ratings()