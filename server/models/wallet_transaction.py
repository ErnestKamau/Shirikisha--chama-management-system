from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db

# -- Wallet Transactions Table (For audit trail)
class WalletTransaction(db.Model,SerializerMixin):
    __tablename__ = 'wallet_transactions'
    __table_args__ = (
        db.CheckConstraint('amount >= 0', name='positive_amount'),
    )
    
    id = db.Column(db.Integer, primary_key=True)
    wallet_id = db.Column(db.Integer, db.ForeignKey('wallets.id'), nullable=False)
    transaction_type = db.Column(db.Enum('CREDIT', 'DEBIT', name='transaction_type'), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    previous_balance = db.Column(db.Numeric(12, 2), nullable=False)
    new_balance = db.Column(db.Numeric(12, 2), nullable=False)
    reference_id = db.Column(db.String ) # Links to contributions, withdrawals, etc.
    description = db.Column(db.String )
    created_by = db.Column(db.Integer, db.ForeignKey('users.id')) # user_id who initiated
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))