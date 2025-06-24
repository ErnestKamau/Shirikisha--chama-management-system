from flask import Flask, make_response, request, jsonify
from flask_restful import Resource
from models import User 
from config import db, bcrypt
from datetime import datetime, timezone

class Register(Resource):
    def post(self):
        data = request.get_json()

        if User.query.filter(User.email==data['email']).first():
            return make_response({"error": "Username already exists"}, 409)
        
        password_hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        user = User(email=data['email'], full_name=data['full_name'], phone=data['phone'], _password_hash=password_hashed, joined_at=datetime.now(timezone.utc))

        db.session.add(user)
        db.session.commit()
        return make_response({"message":"user created successfully"}, 201)