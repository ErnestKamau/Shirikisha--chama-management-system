#!/usr/bin/env python3

from app import app, db, bcrypt
from models import User, ChamaGroup, Membership
from datetime import datetime, timezone

with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    db.create_all()
    print("Tables created successfully.")

    # Create sample user
    print("Creating initial user...")
    password = "password123"
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(
        full_name="Ernest Kamau",
        email="ernest@shirikisha.com",
        phone="0712345678",
        _password_hash=password_hash,
        joined_at=datetime.now(timezone.utc)
    )

    # Create a Chama Group
    print("Creating chama group...")
    chama = ChamaGroup(
        name="Shirikisha Savings Group",
        description="Empowering members through shared savings and investments.",
        created_at=datetime.now(timezone.utc)
    )

    # Add user to group as chair/admin
    print("Assigning user to group as admin...")
    membership = Membership(
        user=user,
        group=chama,
        role="admin",
        joined_at=datetime.now(timezone.utc)
    )

    # Add and commit all to the database
    db.session.add_all([user, chama, membership])
    db.session.commit()
    print("Seeding completed successfully!")

