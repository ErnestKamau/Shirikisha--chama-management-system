#!/usr/bin/env python3

from app import app, db
from models import User, ChamaGroup, Membership, Meeting, Contribution, Announcement, Attendance
from datetime import datetime, timedelta, timezone

def create_user(full_name, email, phone, password, role="user"):
    user = User(
        full_name=full_name,
        email=email,
        phone=phone,
        joined_at=datetime.now(timezone.utc),
        role=role
    )
    user.password_hash = password
    return user

def create_chama(name, description):
    return ChamaGroup(
        name=name,
        description=description,
        created_at=datetime.now(timezone.utc)
    )

def create_membership(user, group, role):
    return Membership(
        user=user,
        group=group,
        role=role,
        joined_at=datetime.now(timezone.utc)
    )

def create_meeting(group, days_from_now, agenda):
    return Meeting(
        group_id=group.id,
        scheduled_at=datetime.now(timezone.utc) + timedelta(days=days_from_now),
        agenda=agenda
    )

def create_contribution(group, user, amount, days_ago):
    return Contribution(
        group_id=group.id,
        user_id=user.id,
        amount=amount,
        date=datetime.now(timezone.utc) - timedelta(days=days_ago)
    )

def create_announcement(group, title, content):
    return Announcement(
        group_id=group.id,
        title=title,
        message=content,
        posted_on=datetime.now(timezone.utc)
    )

def create_attendance(user, meeting, attended=True):
    return Attendance(
        user_id=user.id,
        meeting_id=meeting.id,
        attended=attended
    )

with app.app_context():
    print("🔄 Dropping all tables...")
    db.drop_all()
    db.create_all()
    print("✅ Tables recreated successfully.")

    print("👤 Creating users...")
    users = [
        create_user("Ernest Kamau", "ernest@shirikisha.com", "0712345678", "123ern"),
        create_user("Mary Njoki", "mary@shirikisha.com", "0722123456", "password456"),
        create_user("John Otieno", "john@shirikisha.com", "0733123456", "password123"),
        create_user("Alice Wambui", "alice@shirikisha.com", "0744123456", "alice123"),
    ]
    db.session.add_all(users)

    print("💼 Creating chama groups...")
    chama1 = create_chama("Shirikisha Savings Group", "Empowering members through shared savings and investments.")
    chama2 = create_chama("Unity Investment Club", "Group focused on real estate and agribusiness investments.")
    db.session.add_all([chama1, chama2])
    db.session.commit()  # Commit to assign IDs

    print("📌 Assigning memberships...")
    memberships = [
        create_membership(users[0], chama1, "admin"),
        create_membership(users[1], chama1, "treasurer"),
        create_membership(users[2], chama1, "secretary"),
        create_membership(users[3], chama1, "member"),

        create_membership(users[1], chama2, "admin"),
        create_membership(users[2], chama2, "treasurer"),
    ]
    db.session.add_all(memberships)
    db.session.commit()

    print("📅 Creating meetings...")
    meetings = [
        create_meeting(chama1, 2, "Monthly contribution review"),
        create_meeting(chama1, 7, "Investment strategy session"),
    ]
    db.session.add_all(meetings)
    db.session.commit()

    print("💰 Creating contributions...")
    contributions = []
    for i in range(3):
        contributions.append(create_contribution(chama1, users[1], 5000 + i * 1000, i * 2))
        contributions.append(create_contribution(chama1, users[2], 3000 + i * 500, i * 2))
    db.session.add_all(contributions)

    print("📢 Creating announcements...")
    announcements = [
        create_announcement(chama1, "Next Meeting", "Our next meeting is scheduled for next Saturday."),
        create_announcement(chama1, "Investment Update", "We have finalized plans to buy shares in a SACCO."),
    ]
    db.session.add_all(announcements)

    print("✅ Creating attendance records...")
    attendance_records = [
        create_attendance(users[0], meetings[0], True),
        create_attendance(users[1], meetings[0], True),
        create_attendance(users[2], meetings[0], False),
        create_attendance(users[3], meetings[0], True),
    ]
    db.session.add_all(attendance_records)

    db.session.commit()
    print("🌱 Seeding completed successfully!")

