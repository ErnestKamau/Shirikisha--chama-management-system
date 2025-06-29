from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from models import Contribution, Meeting, Membership
from config import db
from datetime import datetime, timezone

class Dashboard(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()
        
        return jsonify({
            'message': f"Welcome, user {identity['id']}",
            'role': identity['role']
        })



class DashboardData(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()
        user_id = identity['id']

        # Total Contributions
        total_contributions = db.session.query(
            db.func.coalesce(db.func.sum(Contribution.amount), 0)
        ).filter(Contribution.user_id == user_id).scalar()

        # Get user's group IDs
        group_ids = db.session.query(Membership.group_id).filter_by(user_id=user_id).subquery()

        # Next upcoming meeting (from groups user belongs to)
        now = datetime.now(timezone.utc)
        next_meeting = (
            db.session.query(Meeting)
            .filter(Meeting.group_id.in_(group_ids), Meeting.scheduled_at > now)
            .order_by(Meeting.scheduled_at)
            .first()
        )

        return {
            "total_contributions": float(total_contributions),
            "next_meeting": {
                "scheduled_at": next_meeting.scheduled_at.isoformat(),
                "agenda": next_meeting.agenda
            } if next_meeting else None
        }, 200
