# import spacy 
# from spacy import displacy
# from collections import Counter 
# import en_core_web_sm
# nlp=en_core_web_sm.load()

# #str='Interest in fuzzy systems was sparked by Seiji Yasunobu and Soji Miyamoto of Hitachi, who in 1985 provided simulations that demonstrated the feasibility of fuzzy control systems for the Sendai Subway'
# doc=nlp(str)
# def ner():
#     print([(X.text,X.label_) for X in doc.ents])
#     return [(X.text,X.label_) for X in doc.ents]

# #ner()
import itertools
import pymongo
import spacy 
from spacy import displacy
from collections import Counter 
import en_core_web_sm
import json 
nlp=en_core_web_sm.load()
import pandas as pd 
file=pd.read_csv('placement.csv')
df=pd.DataFrame(file)

data=[]
for i in range (0, len(df)):
    obj=dict()
    obj['question']=str(df['question'][i])
    obj['answer']=str(df['answer'][i])
    data.append(obj)

def ner():
    tags = list()
    for i in range(0, len(data)):
        ## uncomment if using python 2.x
        #x = unicode(data[i]['question'], "utf-8")
        doc = nlp(data[i]['question'])
        l = list()
        for ent in doc.ents:
            if(str(ent.label_)==str('CARDINAL') or str(ent.label_)==str('ORDINAL')):
                pass                
            else:
                l.append((ent.text, ent.label_))
        tags.append(l)
    x = list()
    for i in range(0, len(data)):
        y = {}
        y['question'] = df['question'][i]
        y['answer'] = df['answer'][i]
        z = list()
        for j in range(0, len(tags[i])):
            print(type(tags[i][j]))
            z.append(list(tags[i][j]))
        y['tags'] = z
        x.append(y)
    # print(x)
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase2"]
    mycol = mydb["customers"]
    mydb.customers.drop()
    x = mycol.insert_many(x)
    # print("printing flatten")
    flatten = list(itertools.chain.from_iterable(tags))
    # print(flatten)
    # print("flatten done")
    # cursor = mycol.find({})
    # res = list()
    # for i in cursor:
    #     res.append(i)
    return list(set(flatten))

def fetch(args):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase2"]
    mycol = mydb["customers"]
    cursor = mycol.find({"tags":{"$elemMatch":{"$elemMatch":{"$in":[args]}}} })
    # print(cursor)
    data = list()
    for i in cursor:
        x = dict()
        x['question'] = i['question']
        x['answer'] = i['answer']
        data.append(x)
        print(x)
    print(len(data))
    return list(data)
