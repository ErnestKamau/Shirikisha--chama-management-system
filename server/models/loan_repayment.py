from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db


class LoanRepayment(db.Model, SerializerMixin):
    __tablename__ = 'loan_repayments'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    paid_on = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    loan_id = db.Column(db.Integer, db.ForeignKey('loans.id'), nullable=False)
    
    serialize_rules = ('-loan.repayments',)

    
    def __repr__(self):
        return f'<LoanRepayment {self.id} - Amount: {self.amount} for Loan {self.loan_id}>'
