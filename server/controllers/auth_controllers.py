from flask import Flask, make_response, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from flask_restful import Resource
from models import User 
from config import db, bcrypt
from datetime import datetime, timezone

class Register(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')

        if User.query.filter(User.email==email).first():
            return {"error": "Email already exists"}, 409
        
        required_fields = ['full_name', 'phone', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return {"error": f"{field} cannot be empty"}, 400
       
        password_hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        user = User(email=data['email'], full_name=data['full_name'], phone=data['phone'], _password_hash=password_hashed, joined_at=datetime.now(timezone.utc))

        db.session.add(user)
        db.session.commit()
        return {"message":"user created successfully"}, 201
    

class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        password = data.get('password')
        email = data.get('email')
        
        if not email:
            return {"error":"email cannot be empty"}, 400

        if not password:
            return {"error":"password cannot be empty"}, 400
        
        user = User.query.filter(User.email==email ).first()
       
        if user and user.authenticate(password):
            token = create_access_token(identity={"id":user.id, "role":user.role})
            return {
                'token': token,
                'role': user.role,
                'full_name': user.full_name,
                'id': user.id,
                'email': user.email
            }, 200

        
        return {'error': 'Invalid credentials'}, 401
    

