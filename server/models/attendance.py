from sqlalchemy_serializer import SerializerMixin
from app import db


class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id'), nullable=False)
    attended = db.Column(db.Boolean, default=False)

    user = db.relationship('User', back_populates='attendances')
    meeting = db.relationship('Meeting', back_populates='attendances')

    serialize_rules = ('-user.attendances', '-meeting.attendances')

    def __repr__(self):
        return f'<Attendance {self.id} - User {self.user_id} at Meeting {self.meeting_id} - Attended: {self.attended}>'

