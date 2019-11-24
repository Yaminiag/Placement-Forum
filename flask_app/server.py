from flask import Flask,jsonify,request,session
import pymongo
import json
from bson import json_util
from bson import ObjectId
from flask_cors import CORS, cross_origin
import plotly.graph_objects as go
import numpy as np         
import random
import math                

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

if __name__ == "__main__":
    app.debug = True
    app.run()