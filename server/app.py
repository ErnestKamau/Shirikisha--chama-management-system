#!/usr/bin/env python3
from flask import Flask, render_template, make_response, request, jsonify

from flask_restful import Api, Resource
from config import app, api, db, jwt, bcrypt
from controllers.auth_controllers import Register, UserLogin


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Late Show API"}, 200)
    
    
    
api.add_resource(Home, '/api/home', endpoint='home')
api.add_resource(Register, '/api/register', endpoint='register')
api.add_resource(UserLogin, '/api/login', endpoint='login')





if __name__  == "__main__":
    app.run(port=5555, debug=True)