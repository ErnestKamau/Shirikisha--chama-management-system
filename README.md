# Chama Management System

This is a full-stack project for managing chama (group savings) operations.

## 📁 Project Structure
- `client/` – React frontend
- `server/` – Flask backend

## 🧪 Features
- Member contributions
- Loan requests & repayments
- Attendance tracking

## 🚀 Technologies
- Frontend: React.js
- Backend: Flask + SQLAlchemy
- Database: PostgreSQL

## ⚙️ Setup Instructions

### Backend
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
flask db upgrade
flask run
