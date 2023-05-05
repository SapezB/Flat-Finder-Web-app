# from app import db

# class Accounts(db.Model):
#     uid = db.Column(db.Integer, primary_key = True)
#     name =  db.Column(db.String(50))
#     email =  db.Column(db.String(50))
#     password =  db.Column(db.String(50))

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Account(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    admin= db.Column(db.Boolean)
    password = db.Column(db.String(50))
    email = db.Column(db.String(50))
    name = db.Column(db.String(50))
    job = db.Column(db.String(50))
    located = db.Column(db.String(50))
    phoneNum = db.Column(db.String(50))

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer)
    Address = db.Column(db.String(50))
    description = db.Column(db.String(50))
    availableDate = db.Column(db.String(50))
    letType = db.Column(db.String(50))
    furnishType = db.Column(db.String(50))
    Price = db.Column(db.Integer)
    numBathroom = db.Column(db.Integer)
    numBedroom = db.Column(db.Integer)
    image = db.Column(db.String(50))

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ListingId = db.Column(db.Integer)
    userId = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    text = db.Column(db.String(100))

class Favorite(db.Model):
    favid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer)
    listingId = db.Column(db.Integer)