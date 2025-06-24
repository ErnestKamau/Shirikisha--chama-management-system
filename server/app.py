#!/usr/bin/env python3
from flask import Flask, render_template, make_response, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_restful import Api, Resource
from config import app, api, db, jwt, bcrypt
from models import User, Meeting, ChamaGroup, Loan, Attendance, Announcement, LoanRepayment, Contribution, Membership
from controllers.auth_controllers import Register


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
    

class UserLogin(Resource):
    def login(self):
        data = request.get_json()
        
        user = User.query.filter(User.email==data['email']).first()
        
        if user and user.authenticate(data['password']):
            token = create_access_token(identity={"id":user.id, "role":user.role})
            return jsonify({'token': token, 'role': user.role}), 200
        
        return jsonify({'error': 'Invalid credentials'}), 401


    
    
api.add_resource(Home, '/api/home', endpoint='home')
api.add_resource(Users, '/api/users', endpoint='users')
api.add_resource(UserLogin, '/api/login')
api.add_resource(Register, '/api/register', endpoint='register')

if __name__  == "__main__":
    app.run(port=5555, debug=True)