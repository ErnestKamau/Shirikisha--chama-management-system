from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db


class Announcement(db.Model, SerializerMixin):
    __tablename__ = 'announcements'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    posted_on = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)

    group = db.relationship('ChamaGroup', back_populates='announcements')

    serialize_rules = ('-group.announcements',)

    def __repr__(self):
        return f'<Announcement {self.id} - Posted on {self.posted_on} for Group {self.group_id}>'
