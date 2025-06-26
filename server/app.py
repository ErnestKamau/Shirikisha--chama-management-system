#!/usr/bin/env python3
from flask import Flask, render_template, make_response, request, jsonify

from flask_restful import Api, Resource
from config import app, api, db, jwt, bcrypt
from controllers.auth_controllers import Register, UserLogin
from controllers.dashboard import Dashboard
from controllers.chama_group_controller import CreateChamaGroup, GetGroupMembers, AddUserToGroup, ChangeMemberRole, RemoveMember


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Late Show API"}, 200)
    
    
    
api.add_resource(Home, '/api/home', endpoint='home')
api.add_resource(Register, '/api/register', endpoint='register')
api.add_resource(UserLogin, '/api/login', endpoint='login')
api.add_resource(Dashboard, '/api/dashboard', endpoint='dashboard')
api.add_resource(CreateChamaGroup, '/api/group', endpoint='group')
api.add_resource(GetGroupMembers, '/api/group/<int:group_id>/members', endpoint='group_members')
api.add_resource(AddUserToGroup, '/api/group/<int:group_id>/members/<int:person_id>', endpoint='add_member')
api.add_resource(ChangeMemberRole, '/api/group/<int:group_id>/members/<int:user_id>', endpoint='member_role')
api.add_resource(RemoveMember, '/api/group/<int:group_id>/members/<int:user_id>', endpoint='remove_member')




if __name__  == "__main__":
    app.run(port=5555, debug=True)
    
