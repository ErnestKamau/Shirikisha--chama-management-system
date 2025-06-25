from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource

class Dashboard(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()
        
        return jsonify({
            'message': f"Welcome, user {identity['id']}",
            'role': identity['role']
        })
