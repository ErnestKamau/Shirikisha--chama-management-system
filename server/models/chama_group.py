from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db

class ChamaGroup(db.Model, SerializerMixin):
    __tablename__ = 'chama_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    memberships = db.relationship('Membership', back_populates='group', cascade='all, delete-orphan')
    contributions = db.relationship('Contribution', back_populates='group', cascade='all, delete-orphan')
    loans = db.relationship('Loan', back_populates='group', cascade='all, delete-orphan')
    meetings = db.relationship('Meeting', back_populates='group', cascade='all, delete-orphan')
    announcements = db.relationship('Announcement', back_populates='group', cascade='all, delete-orphan')

    serialize_rules = ('-memberships.group', '-contributions.group', '-loans.group', '-meetings.group', '-announcements.group')

    def __repr__(self):
        return f'<ChamaGroup {self.id} : {self.name}>'
