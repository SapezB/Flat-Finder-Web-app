# ## Flask app.
# # https://flask.palletsprojects.com/en/2.2.x/quickstart/#apis-with-json
# #TO START FLASK SERVER, 1. cd to api folder, 2. in terminal type: flask run
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Account, Listing, Favorite,Reviews
import secrets
import random


app = Flask(__name__) 
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config.from_object(__name__)
db.init_app(app)
app.secret_key = secrets.token_hex(16)



with app.app_context():     
    db.create_all()

 #Methods used for adding, getting, removing Accounts
@app.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json()
    accounts = make_account_list(Account.query.all())
    for account in accounts:
        if data['email'] == account['email']:
            return jsonify({'result': 'Error'})
    new_account= Account( email = data['email'], password = data['password'], name = data['name'], admin = data['admin'])
    db.session.add(new_account)
    db.session.commit()
    return jsonify({'result': 'Success'})

@app.route('/get_accounts', methods=['GET'])
def get_accounts():
    accounts = Account.query.all()
    account_list = make_account_list(accounts)
    return jsonify({'accounts': list(account_list)})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    accounts = make_account_list(Account.query.all())
    for account in accounts:
        if account['email'] == data['email'] and account['password'] == data['password']:
            return jsonify({'result' : 'Success', 
                            'id' : account['id']
                            })
    return jsonify({'result' : 'Fail'})


def make_account_list(accounts):
    account_list = []
    for account in accounts:
        account_list.append({
            'id': account.uid,
            'email': account.email,
            'password': account.password,
            'name': account.name,
            'admin' : account.admin,
            'job' : account.job,
            'located' : account.located,
            'phoneNum' : account.phoneNum
        })
    return account_list

@app.route('/get_profile', methods=['POST'])
def get_profile():
    uid = request.get_json()
    accountList = Account.query.all()
    for account in accountList:
        if account.uid == uid['id']:
            return jsonify({
                'email' : account.email,
                'name' : account.name,
                'job' : account.job,
                'located' : account.located,
                'phoneNum' : account.phoneNum
            })
    return jsonify({'result': 'Error'})

@app.route('/get_connects', methods=['GET'])
def get_connects(): #Function gets 4 random connect accounts for the profile page
    accounts = Account.query.all()
    list = []
    accList = [] #Tracks which accounts are in list already
    for x in range(4):
        num = random.randint(0,len(accounts)-1)
        connect = accounts[num]
        if connect not in accList:
            accList.append(connect)
            list.append({
                        'name' : connect.name,
                         'job' : connect.job})
    return jsonify(list)



#Methods used for adding, getting, removing Listings
@app.route('/listings', methods=['GET'])
def get_listings():
    listings = Listing.query.all()
    list  = []
    for listing in listings:
        list.append({
            'id': listing.id,
            'Address': listing.Address,
            'description': listing.description,
            'Price': listing.Price,
            'numBathroom': listing.numBathroom,
            'numBedroom': listing.numBedroom,
            'availableDate' : listing.availableDate,
            'letType' : listing.letType,
            'furnishType' : listing.furnishType,
            'image' : listing.image
        })
    return jsonify({'listings': list})


@app.route('/add_listing', methods=['POST'])
def add_listing():
    data = request.get_json()
    new_listing= Listing( uid = data['uid'], image=data['image'],Address = data['Address'], description = data['description'], Price = data['Price'], numBathroom = data['numBathroom'],numBedroom = data['numBedroom'],furnishType = data['furnishType'], letType = data['letType'],availableDate = data['availableDate'])
    db.session.add(new_listing)
    db.session.commit()
    return jsonify({'result': 'Success'})

@app.route('/remove_listing', methods=['POST']) #Used to remove listings.
def remove_listing():
    data = request.get_json()
    listings = Listing.query.all()
    print(data)
    for listing in listings:
        if data['id'] == listing.id:
            db.session.delete(listing)
            db.session.commit()
            return jsonify({'result': 'Success'})  
    return jsonify({'result': 'Error'})


@app.route('/get_listing', methods=['POST']) #Used to get single listing
def get_listing():
    data = request.get_json()
    listings = Listing.query.all()
    for listing in listings:
        if int(data['id']) == listing.id:
            return jsonify({            
            'id': listing.id,
            'Address': listing.Address,
            'description': listing.description,
            'Price': listing.Price,
            'numBathroom': listing.numBathroom,
            'numBedroom': listing.numBedroom,
            'availableDate' : listing.availableDate,
            'letType' : listing.letType,
            'furnishType' : listing.furnishType,
            'image' : listing.image,
            'uid' : listing.uid})
    return jsonify({'result' :'error'})

@app.route('/owned_listings', methods=['POST'])
def getOwnedListings():
    uid = request.get_json()
    newList = []
    listingList = Listing.query.all()
    for x in listingList:
        if x.uid == uid['id']:
            newList.append({
                'Address' : x.Address,
                'Price' : x.Price,
                'image' : x.image,
                'id' : x.id
            })
    print(newList)
    return jsonify({'owned' : newList})


#Methods used for adding, getting, removing Reviews
@app.route('/get_reviews', methods=['POST'])
def get_reviews():
    listingId = request.get_json()
    reviews = Reviews.query.all()
    users = Account.query.all()
    list  = []
    for review in reviews:
        if review.ListingId == int(listingId['id']['listingId']):
            for user in users:
                if user.uid == review.userId:
                    name = user.name
            list.append({
                'id': review.id,
                'rating': review.rating,
                'text': review.text,
                'name' : name
                }  )
    return list


@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Reviews( ListingId = data['ListingId'], userId = data['uid'] , rating = data['rating'], text = data['text'] )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'result': 'Success'})




    
#Favorite methods 
@app.route('/favorites', methods=['POST'])
def getFavorites():
    uid = request.get_json()
    newList = []
    favoriteList = Favorite.query.all()
    listingList = Listing.query.all()
    for x in favoriteList:
        if x.uid == uid['id']:
            for y in listingList:
                if x.listingId == y.id:
                    newList.append({
                        'Address' : y.Address,
                        'Price' : y.Price,
                        'image' : y.image,
                        'id' : y.id
                    })
    print(newList)
    return jsonify(newList)
    
@app.route('/add_favorite', methods=['POST'])
def add_favorite():
    data = request.get_json()
    print(data)
    new_favorite =  Favorite(uid = data['uid'], listingId = data['listingId'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'result': 'Success'})


