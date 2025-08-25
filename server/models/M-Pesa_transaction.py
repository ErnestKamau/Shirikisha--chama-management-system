from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db

class MPesaTransaction(db.Model, SerializerMixin):
    __tablename__ = 'mpesa_transactions'
    
    id = db.Column(db.Integer, primary_key=True)
     # M-Pesa Specific Fields 
    merchant_request_id = db.Column(db.String(100), unique=True) # From M-Pesa STK Push response
    checkout_request_id = db.Column(db.String(100), unique=True) # From M-Pesa STK Push response
    account_reference = db.Column(db.String(50)) # Our custom reference sent to M-Pesa
     # Transaction Details
    phone_number = db.Column(db.String(15), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    transaction_desc = db.Column(db.String)
    status = db.Column(db.Enum('pending', 'success', 'failed', 'cancelled', name='transaction_status'), default='pending')
     # M-Pesa Response Fields (populated by callback)
    mpesa_reciept_number = db.Column(db.String(50)) # M-Pesa confirmation code
    transaction_date = db.Column(db.DateTime) # When M-Pesa processed it
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    contribution_id = db.Column(db.Integer, db.ForeignKey('contributions.id'))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    
    group = db.relationship('ChamaGroup', back_populates='mpesa_transactions')
    user = db.relationship('User', back_populates='mpesa_transactions')
    contribution = db.relationship('Contribution', back_populates='mpesa_transaction')

