from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db


class Contribution(db.Model, SerializerMixin):
    __tablename__ = 'contributions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)
    contribution_type = db.Column(db.String, default='regular')
    status = db.Column(db.Enum('pending', 'completed', 'failed', name='contribution_status'), nullable=False)
    payment_method = db.Column(db.String, default='M-Pesa')
    mpesa_transaction_id = db.Column(db.String, db.ForeignKey('mpesa_transactions.id'))
    wallet_transactions_id = db.Column(db.String, db.ForeignKey('wallet_transactions.id'))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='contributions')
    group = db.relationship('ChamaGroup', back_populates='contributions')

    serialize_rules = ('-user.contributions', '-group.contributions')

    def __repr__(self):
        return f'<Contribution {self.id} - Amount: {self.amount} by User {self.user_id} in Group {self.group_id}>'