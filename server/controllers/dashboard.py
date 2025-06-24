from flask import Flask, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource

@jwt_required()
class Dashboard(Resource):
    def dashboard(self):
        identity = get_jwt_identity()
        
        return jsonify({
        'message': f"Welcome, user {identity['id']}",
        'role': identity['role']
    })