from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db

# (One-to-One with Groups)
class wallet(db.Model, SerializerMixin):
    __tablename__ = 'wallets'
    __table_args__ = (
        db.CheckConstraint('balance >= 0', name='positive_balance'),
    )
    
    id = db.Column(db.Integer, primary_key=True)
    chama_group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)
    balance = db.Column(db.Numeric(12, 2), nullable=False, default=0.00)
    currency = db.Column(db.String, default='KES')
    total_contributions = db.Column(db.Numeric(12, 2), default=0.00) # Running total of all contributions
    total_withdrawals= db.Column(db.Numeric(12, 2), default=0.00) # Running total of all withdrawals
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    
    group = db.relationship('ChamaGroup', back_populates='wallet')
    transactions = db.relationship('WalletTransaction', back_populates='wallet', cascade='all, delete-orphan')
    

    