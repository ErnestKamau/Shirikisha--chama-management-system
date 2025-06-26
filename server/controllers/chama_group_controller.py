from flask import Flask, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from datetime import datetime, timezone
from config import db
from models import ChamaGroup, Membership, User 

class CreateChamaGroup(Resource):
    @jwt_required()
    def post(self):
        identity = get_jwt_identity()
        data = request.get_json()
        
        chama_group = ChamaGroup(name=data['name'], description=data['description'], created_at=datetime.now(timezone.utc))
        
        db.session.add(chama_group)
        db.session.commit()
        
        membership = Membership(user_id=identity['id'], group_id=chama_group.id, role='chair', joined_at=datetime.now(timezone.utc))
        db.session.add(membership)
        db.session.commit()
        
        return {'message': 'Chama group created successfully', 'group_id': chama_group.id}, 201
       
class GetGroupMembers(Resource):   
    @jwt_required()
    def get(self, group_id):
        members = Membership.query.filter(Membership.group_id == group_id).all()
        
        return [{'member': m.user_id, 'role':m.role }for m in members], 200


class AddUserToGroup(Resource):    
    @jwt_required
    def post(self, person_id, group_id):
        identity = get_jwt_identity()
        admin = Membership.query.filter(Membership.id == identity['id']).first()
        
        
        if not admin or (admin.role not in ['chair', 'admin']):
            return {'error': 'Unauthorized'}, 403
        else:
            user = User.query.filter(User.id == person_id).first()
            chama_group = ChamaGroup.query.filter(ChamaGroup.id == group_id).first()
            
            if not user or not chama_group:
                return {'error':'Not Found'}, 404
            else:
                data = request.get_json()
                u_id = data.get('user_id')
                role = data.get('role', 'member')
                
                existing = Membership.query.filter_by(user_id=u_id, group_id=chama_group.id).first()
                if existing:
                    return {'error': 'User already a member'}, 400
                
                if u_id and role:
                    membership = Membership(user_id=data['user_id'], group_id=chama_group.id, role=role, joined_at=datetime.now(timezone.utc))
                    db.session.add(membership)
                    db.session.commit()
                    
                    return {'message': 'User added to group'}, 201
    
class ChangeMemberRole(Resource):  
    @jwt_required()
    def post(self, group_id, user_id):
        identity = get_jwt_identity()
        admin = Membership.query.filter(Membership.id == identity['id']).first()
        
        
        if not admin or admin.role != 'admin':
            return {'error': 'Unauthorized'}, 403
        else:
            membership = Membership.query.filter_by(group_id=group_id, user_id=user_id).first_or_404()
            
            if not membership:
                return jsonify({'error': 'Member not found'}), 404
        
            data = request.get_json()
            new_role = data.get('role')
            allowed_roles = ['member', 'secretary', 'treasurer']

            if new_role and new_role in allowed_roles:
                membership.role = new_role
                db.session.commit()
                return {'message': 'Role updated!'}, 200
            else:
                return {'error': 'Invalid role specified'}, 400 
            
class RemoveMember(Resource):      
    @jwt_required()
    def delete(self, user_id, group_id):
        identity = get_jwt_identity()
        admin = Membership.query.filter(Membership.id == identity['id']).first()
        
        
        if not admin or admin.role != 'admin':
            return {'error': 'Unauthorized'}, 403
        else:
            membership = Membership.query.filter_by(group_id=group_id, user_id=user_id).first()
            if not membership:
                return {'error': 'Member not found in group'}, 404

            db.session.delete(membership)
            db.session.commit()
            return {'message': 'Member removed from group'}, 200
        

class GetChamaGroups(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()
        user_id = identity['id']
        
        groups = (
            db.session.query(ChamaGroup, Membership)
            .join(Membership, Membership.group_id == ChamaGroup.id)
            .filter(Membership.user_id == user_id)
            .all()
        )

        return jsonify([
            {
                'id': g.id,
                'name': g.name,
                'description': g.description,
                'role': m.role
            } for g, m in groups
        ])


class ChamaGroupDetail(Resource):
    @jwt_required()
    def get(self, group_id):
        identity = get_jwt_identity()
        user_id = identity['id']

        # Confirm user is part of the group
        membership = Membership.query.filter_by(group_id=group_id, user_id=user_id).first()
        if not membership:
            return jsonify({'error': 'Unauthorized'}), 403

        chama = ChamaGroup.query.get_or_404(group_id)

        # Prepare member list with user data
        members = Membership.query.filter_by(group_id=group_id).join(User).all()
        members_data = [
            {
                'id': m.user.id,
                'full_name': m.user.full_name,
                'email': m.user.email,
                'role': m.role
            }
            for m in members
        ]

        # Use .to_dict() and attach extra manually
        data = chama.to_dict(rules=('-memberships', '-contributions', '-loans', '-meetings', '-announcements'))
        data['members'] = members_data
        data['user_role'] = membership.role


        return data, 200

    