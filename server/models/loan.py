from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from app import db


class Loan(db.Model, SerializerMixin):
    __tablename__ = 'loans'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, default=10.0)  # %
    issued_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    due_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='pending')  # approved, rejected, paid, defaulted

    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('chama_groups.id'), nullable=False)

    borrower = db.relationship('User', backref='loans')
    repayments = db.relationship('LoanRepayment', backref='loan', cascade='all, delete-orphan')
    
    serialize_rules = ('-borrower.loans', '-group.loans', '-repayments.loan')
    
    def __repr__(self):
        return f'<Loan {self.id} - Amount: {self.amount} by User {self.borrower_id} in Group {self.group_id}>'
