from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db


class Contribution(db.Model, SerializerMixin):
    __tablename__ = 'contributions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)

    member = db.relationship('User', backref='contributions')
    
    serialize_rules = ('-member.contributions', '-group.contributions')
    
    def __repr__(self):
        return f'<Contribution {self.id} - Amount: {self.amount} by User {self.member_id} in Group {self.group_id}>'