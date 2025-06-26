from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from app import db


class Meeting(db.Model, SerializerMixin):
    __tablename__ = 'meetings'

    id = db.Column(db.Integer, primary_key=True)
    scheduled_at = db.Column(db.DateTime, nullable=False)
    agenda = db.Column(db.Text)
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)

    group = db.relationship('ChamaGroup', back_populates='meetings')
    attendances = db.relationship('Attendance', back_populates='meeting', cascade='all, delete-orphan')

    serialize_rules = ('-group.meetings', '-attendances.meeting')

    def __repr__(self):
        return f'<Meeting {self.id} - Scheduled at {self.scheduled_at} for Group {self.group_id}>'
