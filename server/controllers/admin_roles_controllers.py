# users.py
from flask_restful import Resource, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone
from models import User, Membership, ChamaGroup
from config import db

class GetAllUsers(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        return [{'id': u.id, 'full_name': u.full_name, 'email': u.email} for u in users], 200


class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()
        user = User.query.get(identity['id'])
        return {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "phone": user.phone,
            "joined_at": user.joined_at.isoformat(),
            "role": user.role,
        }, 200


    
    

    


class RemoveUserFromGroup(Resource):
    @jwt_required()
    def delete(self, group_id, person_id):
        identity = get_jwt_identity()
        admin = Membership.query.filter_by(user_id=identity['id'], group_id=group_id).first()

        if not admin or admin.role not in ['admin', 'chair']:
            return {'error': 'Unauthorized'}, 403



        membership = Membership.query.filter_by(group_id=group_id, user_id=person_id).first()
        if not membership:
            return {'error': 'Member not found'}, 404

        db.session.delete(membership)
        db.session.commit()
        return {'message': 'Member removed'}, 200

