#!/usr/bin/env python3
from flask import Flask, render_template, make_response, request, jsonify

from flask_restful import Api, Resource
from config import app, api, db, jwt, bcrypt
from models import User, Meeting, ChamaGroup, Loan, Attendance, Announcement, LoanRepayment, Contribution, Membership
from controllers.auth_controllers import Register, UserLogin


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Late Show API"}, 200)
    


class Users(Resource):
    def get(self):
        users = User.query.all()
        l = [user.to_dict() for user in users]
        return make_response({"users": l}, 200)
    



    
    
api.add_resource(Home, '/api/home', endpoint='home')
api.add_resource(Users, '/api/users', endpoint='users')
api.add_resource(UserLogin, '/api/login', endpoint='login')
api.add_resource(Register, '/api/register', endpoint='register')

if __name__  == "__main__":
    app.run(port=5555, debug=True)