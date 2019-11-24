from flask import Flask,jsonify,request,session
import pymongo
import json
from bson import json_util
from bson import ObjectId
from flask_cors import CORS, cross_origin      
from datetime import datetime
from flask import Flask, flash, request, redirect, url_for
from flask import send_from_directory, jsonify
from werkzeug.utils import secure_filename
import itertools
import pymongo
import spacy 
from spacy import displacy
from collections import Counter 
import en_core_web_sm
nlp=en_core_web_sm.load()
import pandas as pd 
file=pd.read_csv('placement.csv')
df=pd.DataFrame(file)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super secret'
cors = CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

mongo_client = pymongo.MongoClient('localhost', 27017)
mongo_db = mongo_client['SE']

def convertCursor(info):
    data = []
    for x in info:
        data.append(x)
    return data	

def sortUpvotes(answer):
    if 'upvotes' in answer:
        return answer['upvote_count']
    else:
        return 0

def ner():
    tags = list()
    table = mongo_db['question']
    data = table.find({},{'_id':False})
    data = convertCursor(data)
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
            #print(type(tags[i][j]))
            z.append(list(tags[i][j]))
        y['tags'] = z
        x.append(y)
    # print(x)
    mycol = mongo_db["question"]
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
    print("args inside", args, len(args), type(args))
    data1 = list()
    data1.append(args) 
    print(data1)
    mycol = mongo_db["question"]
    # cursor = mycol.find({"tags":{"$elemMatch":{"$elemMatch":{"$in":[args]}}} })
    cursor = mycol.find({'tags':{"$elemMatch":{"$elemMatch":{"$in":data1}}}})

    # print(cursor)
    
    # cursor = mycol.find({"$text": {"$search": args}})

    data = list()
    for i in cursor:
        print("hello")
        x = dict()
        x['question'] = i['question']
        x['answer'] = i['answer']
        data.append(x)
        print(x)
    print(len(data))
    return list(data)

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='POST':
        table = mongo_db['user']
        data = request.get_json()
        print(data)
        cursor = table.find(data)
        res = convertCursor(cursor)
        if len(res)>0:
            resp = {'message' : 'Valid User'}
            resp = jsonify(resp)
            print(resp)
            return resp,200
        else:
            resp = {'message' : 'Invalid User'}
            print(resp)
            return jsonify(resp),400
    else:
        resp = {'message' : 'method not allowed'}
        return resp,405


@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        # uname = data['username']
        # pwd = data['password']
        email = data['email']
        table = mongo_db['user']
        cursor = table.find({'email':email})
        res = convertCursor(cursor)
        if(len(res)==0):
            val = table.insert(data)
            if(val):
                resp = {'message' : 'user registered successfully'}
                resp = jsonify(resp)
                return resp,200
            else:
                resp = {'message' : 'user registeration failed'}
                return jsonify(resp),400
        else:
            resp = {'message' : 'user exists'}
            return jsonify(resp),200
        
    else:
        resp = {'message' : 'method not allowed'}
        return jsonify(resp),405

@app.route('/api/v1/user')
def user():
    if request.method == 'GET':
        data = request.args.get('email')
        user = {'email': data}
        print(user)
        table = mongo_db['user']
        val = table.find(user,{'_id':False})
        val = convertCursor(val)
        if(len(val)==1):
            return jsonify(val),200
        return jsonify({}),400
    return jsonify({}),405

@app.route('/api/v1/question',methods=['GET','POST','DELETE'])
def question():
    if request.method == 'POST':
        # getting timestamp to set the question's (last-modified) timestamp
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        # getting data
        table = mongo_db['question']
        data = request.get_json()
        data['timestamp'] = dt_string
        data['answer'] = []
        val = table.insert(data)
        if val:
            resp = {}
            return jsonify(resp),201
        else:
            resp = {}
            return jsonify(resp),400
    
    elif request.method == 'DELETE':
        data = request.get_json()
        table = mongo_db['question']
        print(data)
        val = table.find(data)
        val = convertCursor(val)
        print(val)
        if len(val)>0:
            r = table.delete_many(data)
            resp = {}
            return jsonify(resp),200
        else:
            return jsonify({}),400
    else:
        return jsonify({}),405

@app.route('/api/v1/query/validated', methods=['GET'])
def validated():
    if request.method == 'GET':
        data = request.args.get('email')
        user = {'email': data}
        print(user)
        table = mongo_db['user']
        val = table.find(user)
        val = convertCursor(val)
        year = val[0]['year']
        if year in ['3', '4', '5']:
            return jsonify({'validated': True}),200
        else:
            return jsonify({'validated': False}),200
    else:
        return jsonify({}),405

@app.route('/api/v1/answer',methods=['GET','POST','DELETE'])
def answer():
    if request.method == 'POST':
        # getting timestamp to update the question's (last-modified) timestamp
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        # getting data
        data = request.get_json()
        table = mongo_db['question']
        # making the answer JSON to append to answers array of particular question
        details_to_add = {}
        details_to_add['email'] = data['email']
        details_to_add['answer'] = data['answer']
        # searching for question
        question = {'question': data['question']}
        val = table.find(question)
        val = convertCursor(val)
        try:
            val = val[0]
            print(val)
        except IndexError:
            # question not found
            return jsonify({}),400
        # update question with new timestamp and new answer
        existing_answers = val['answer']
        existing_answers.append(details_to_add)
        newvalues = {'$set': {'answer': existing_answers, 'timestamp': dt_string}}
        val = table.update_one(question, newvalues)
        if val:
            resp = {}
            return jsonify(resp),201
        else:
            resp = {}
            return jsonify({}),400
    
    elif request.method == 'DELETE':
        # getting timestamp to update the question's (last-modified) timestamp
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        # getting data
        data = request.get_json()
        table = mongo_db['question']
        question = {'question': data['question']}
        # finding question
        val = table.find(question)
        val = convertCursor(val)
        try:
            val = val[0]
        except IndexError:
            # question not found
            return jsonify({}),400
        # searching for answer in the answers array of the question
        existing_answers = val['answer']
        found = False
        updated_answers = []
        for ea in existing_answers:
            if ea['answer']==data['answer']:
                found = True
            else:
                updated_answers.append(ea)
        if not found:
            # answer not found
            return jsonify({}),400

        # updating the question by deleting answer
        newvalues = {'$set': {'answer': updated_answers, 'timestamp': dt_string}}
        val = table.update_one(question, newvalues)
        if val:
            resp = {}
            return jsonify(resp),200
        else:
            resp = {}
            return jsonify({}),400
    else:
        return jsonify({}),405

@app.route('/api/v1/answer/upvote',methods=['POST'])
def upvote():
    if request.method == 'POST':
        # getting timestamp to update the question's (last-modified) timestamp
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        # getting request data
        data = request.get_json()
        table = mongo_db['question']
        question = {'question': data['question']}
        # finding question
        val = table.find(question)
        val = convertCursor(val)
        try:
            val = val[0]
        except IndexError:
            # question not found
            return jsonify({}),400
        # searching for answer in the answers array of the question
        user = data['email']
        existing_answers = val['answer']
        found = False
        for i in range(len(existing_answers)):
            if existing_answers[i]['answer']==data['answer']:
                found = True
                if 'upvotes' in existing_answers[i]:
                    upvoted_users = set(existing_answers[i]['upvotes'])
                    upvoted_users.add(user)
                    existing_answers[i]['upvotes'] = list(upvoted_users)
                    existing_answers[i]['upvote_count'] += 1
                else:
                    existing_answers[i]['upvotes'] = [user]
                    existing_answers[i]['upvote_count'] = 1
                break
        if not found:
            # answer not found
            return jsonify({}),400
        
        # sorting answer list based on number of upvotes
        existing_answers.sort(key = sortUpvotes, reverse = True)

        # updating question
        newvalues = {'$set': {'answer': existing_answers, 'timestamp': dt_string}}
        val = table.update_one(question, newvalues)
        if val:
            resp = {}
            return jsonify(resp),200
        else:
            resp = {}
            return jsonify({}),400
    else:
        return jsonify({}),405

@app.route('/api/v1/feed',methods=['GET'])
def feed():
    if request.method == 'GET':
        table = mongo_db['question']
        val = table.find({},{'_id':False})
        val = convertCursor(val)
        val.sort(key = lambda x: x['timestamp'], reverse = True)
        return jsonify(val),200
    else:
        return jsonify({}),405

@app.route('/ner', methods=['GET', 'POST'])
def callner():
        if request.method=="GET":
                a=ner()
                return jsonify(a)

@app.route('/get_tags', methods=['GET', 'POST'])
def callfetch():
        if request.method=="GET":
                args=request.args.get('key')
                print("args hello", args)
                res = fetch(args)
                print(res)
                return jsonify(res)


@app.route('/choice',methods=['GET','POST'])
def choice():
        if request.method=="POST":
                data=request.form.get('text')
                print("data",data)
                return jsonify(data)



if __name__ == "__main__":
    app.debug = True
    app.run()