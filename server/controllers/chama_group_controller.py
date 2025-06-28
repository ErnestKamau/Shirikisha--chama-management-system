from flask import Flask, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from datetime import datetime, timezone
from config import db
from models import ChamaGroup, Membership, User, Contribution, Meeting, Announcement, Attendance

class CreateChamaGroup(Resource):
    @jwt_required()
    def post(self):
        identity = get_jwt_identity()
        data = request.get_json()
        
        chama_group = ChamaGroup(name=data['name'], description=data['description'], created_at=datetime.now(timezone.utc))
        
        db.session.add(chama_group)
        db.session.commit()
        
        membership = Membership(user_id=identity['id'], group_id=chama_group.id, role='admin', joined_at=datetime.now(timezone.utc))
        db.session.add(membership)
        db.session.commit()
        
        return {'message': 'Chama group created successfully', 'group_id': chama_group.id}, 201
       
class GetGroupMembers(Resource):   
    @jwt_required()
    def get(self, group_id):
        members = Membership.query.filter(Membership.group_id == group_id).all()

        return [{
            'id': m.user.id,
            'full_name': m.user.full_name,
            'email': m.user.email,
            'role': m.role
        } for m in members], 200



class AddUserToGroup(Resource):
    @jwt_required()
    def post(self, group_id, person_id):
        identity = get_jwt_identity()
        admin_membership = Membership.query.filter_by(user_id=identity['id'], group_id=group_id).first()

        if not admin_membership or admin_membership.role != 'admin':
            return {'error': 'Unauthorized'}, 403

        user = User.query.get(person_id)
        chama_group = ChamaGroup.query.get(group_id)

        if not user or not chama_group:
            return {'error': 'User or group not found'}, 404

        existing = Membership.query.filter_by(user_id=person_id, group_id=group_id).first()
        if existing:
            return {'error': 'User already a member'}, 400

        data = request.get_json()
        role = data.get('role', 'member')

        membership = Membership(
            user_id=person_id,
            group_id=group_id,
            role=role,
            joined_at=datetime.now(timezone.utc)
        )

        db.session.add(membership)
        db.session.commit()

        return {'message': 'User added to group'}, 201

    
class ChangeMemberRole(Resource):  
    @jwt_required()
    def post(self, group_id, user_id):
        identity = get_jwt_identity()
        admin = Membership.query.filter_by(user_id=identity['id'], group_id=group_id).first()
        
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
        admin = Membership.query.filter_by(user_id=identity['id'], group_id=group_id).first()

        
        
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
        announcements = chama.announcements
        meetings = chama.meetings
        # Prepare meetings data
        meetings_data = [
            {
                'id': m.id,
                'agenda': m.agenda,
                'scheduled_at': m.scheduled_at.isoformat(),
                'attendees': [a.user.full_name for a in m.attendances]
            } for m in meetings
        ]
        # Prepare contributions data
        contributions = chama.contributions
        contributions_data = [
            {
                'user_id': c.user_id,
                'id': c.id,
                'amount': c.amount,
                'date': c.date.isoformat(),
                'member': {
                    'id': c.user.id,
                    'full_name': c.user.full_name
                }
            } for c in contributions
        ]
        
        
        
        # Use .to_dict() and attach extra manually
        data = chama.to_dict(rules=('-memberships', '-contributions', '-loans', '-meetings', '-announcements'))
        data['members'] = members_data
        data['user_role'] = membership.role
        data['meetings'] = meetings_data
        data['announcements'] = [
            {
                'id': a.id,
                'title': a.title,
                'message': a.message,
                'posted_on': a.posted_on.isoformat()
            } for a in announcements
        ]
        data['contributions'] = contributions_data
        


        return data, 200




class ContributionUpdate(Resource):
    @jwt_required()
    def put(self, group_id, contribution_id):
        identity = get_jwt_identity()
        user_id = identity['id']
        print(f"User ID: {user_id}, Group ID: {group_id}, Contribution ID: {contribution_id}")

        membership = Membership.query.filter_by(user_id=user_id, group_id=group_id).first()
        if not membership or membership.role != 'treasurer':
            print("User not authorized to update contribution.")
            return {'error': 'Only treasurers can edit contributions'}, 403

        contribution = Contribution.query.filter_by(id=contribution_id, group_id=group_id).first()
        if not contribution:
            print("Contribution not found.")
            return {'error': 'Contribution not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('amount', type=float)
        parser.add_argument('date', type=str)
        args = parser.parse_args()
        print(f"Parsed args: {args}")

        if args['amount'] is not None:
            contribution.amount = args['amount']
        if args['date']:
            try:
                from datetime import datetime
                contribution.date = datetime.fromisoformat(args['date'])
            except ValueError:
                return {'error': 'Invalid date format. Use ISO format.'}, 400

        try:
            db.session.commit()
            print("Contribution updated successfully.")
        except Exception as e:
            print("Error during db.session.commit():", e)
            return {'error': 'Failed to update contribution.'}, 500

        # return jsonify({'message': 'Contribution updated successfully', 'contribution': contribution.to_dict()})
        return {'message': 'Contribution updated successfully'}


class MeetingCreate(Resource):
    @jwt_required()
    def post(self, group_id):
        identity = get_jwt_identity()
        user_id = identity['id']

        # Check if user is a secretary in the group
        membership = Membership.query.filter_by(user_id=user_id, group_id=group_id).first()
        if not membership or membership.role != 'secretary':
            return {'error': 'Only secretaries can schedule meetings'}, 403

        parser = reqparse.RequestParser()
        parser.add_argument('agenda', type=str, required=True, help='Agenda is required')
        parser.add_argument('scheduled_at', type=str, required=True, help='Scheduled date is required (ISO format)')
        args = parser.parse_args()

        try:
            from datetime import datetime
            scheduled_datetime = datetime.fromisoformat(args['scheduled_at'])
        except ValueError:
            return {'error': 'Invalid date format. Use ISO format (e.g., 2024-06-28T15:00:00)'}, 400

        new_meeting = Meeting(
            agenda=args['agenda'],
            scheduled_at=scheduled_datetime,
            group_id=group_id
        )
        db.session.add(new_meeting)
        db.session.commit()

        # return jsonify({'message': 'Meeting scheduled successfully', 'meeting': new_meeting.to_dict()})
        return {'message': 'Meeting scheduled successfully'}
