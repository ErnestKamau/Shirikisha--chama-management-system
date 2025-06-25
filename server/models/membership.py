from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db



class Membership(db.Model, SerializerMixin):
    __tablename__ = 'memberships'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)
    role = db.Column(db.String(50), default='member')  # member,chair(admin), treasurer
    joined_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    
    serialize_rules = ('-user.memberships', '-group.memberships')


def __repr__(self):
        return f'<Membership {self.id} - User {self.user_id} in Group {self.group_id}>'