from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True)
    _password_hash = db.Column(db.String(128))
    joined_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    role = db.Column(db.String(20), default='user')

    memberships = db.relationship('Membership', back_populates='user', cascade='all, delete-orphan')
    contributions = db.relationship('Contribution', back_populates='user', cascade='all, delete-orphan')
    loans = db.relationship('Loan', back_populates='user', cascade='all, delete-orphan')
    attendances = db.relationship('Attendance', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-memberships.user', '-contributions.user', '-loans.user', '-attendances.user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id} : {self.full_name}>'

