# Shirikisha – Chama (Investment Group) Management System

**Shirikisha** is a full-stack web platform that simplifies and digitizes the management of Kenyan *chamas* (investment groups). Members can create, join, and manage chama groups, track contributions and finances, schedule meetings, make announcements, and assign roles — all in one platform.

---

## 🚀 Features

- **User Registration & Login**: Secure authentication with JWT-based authentication.
- Role-based access control (RBAC)
- **Chama Group Management**: Create, join, and manage multiple groups.
- **Role Management**: Assign roles (admin, treasurer, secretary, member) to group members.
- **Financial Tracking**: Record and view contributions for each group.
- **Meetings**: Schedule and view upcoming meetings.
- **Announcements**: Share important updates with group members.(group-wide announcements)


---

##  Tech Stack

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) – fast modern UI
- [Tailwind CSS](https://tailwindcss.com/) – styling
- [Axios](https://axios-http.com/) – HTTP client
- React Router DOM – routing

### Backend
- [Flask](https://flask.palletsprojects.com/) – REST API
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/) – JWT authentication
- [Flask-Migrate](https://flask-migrate.readthedocs.io/) – database migrations
- [SQLAlchemy](https://www.sqlalchemy.org/) – ORM
- [PostgreSQL](https://www.postgresql.org/) – production database
- [SQLite](https://www.sqlite.org/) – dev/test database
- [Gunicorn](https://gunicorn.org/) – WSGI server for production

---

## Development
- **Frontend**: React, Vite, Tailwind CSS (`client/`)
- **Backend**: Flask, Flask-RESTful, Flask-JWT-Extended, SQLAlchemy (`server/`)


## API Routes Overview (Flask)
| Endpoint                                 | Method | Description                                            |
| ---------------------------------------- | ------ | ------------------------------------------------------ |
| `/api/register`                          | POST   | Register user                                          |
| `/api/login`                             | POST   | Login & return token                                   |
| `/api/chamas/create`                     | POST   | Create a chama                                         |
| `/api/user/chamagroups`                  | GET    | List user's chama groups                               |
| `/api/groups/<id>`                       | GET    | Chama group details                                    |
| `/api/groups/<id>/add-user/<user_id>`    | POST   | Add user to chama                                      |
| `/api/groups/<id>/change-role/<user_id>` | POST   | Change user role                                       |
| `/api/groups/<id>/members/<user_id>`     | DELETE | Remove user                                            |
| ...                                      | ...    | Schedule meetings (secretary only), add contributions |



## THE SITE IS HOSTED ON https://shirikisha-investment-groups-manager.onrender.com
---

## Demo Accounts

After visiting https://shirikisha-investment-groups-manager.onrender.com , you can log in with any of these demo accounts:

| Name           | Email                   | Password      | Role      |
|----------------|------------------------|--------------|-----------|
| Ernest Kamau   | ernest@shirikisha.com  | 123ern       | admin     |
| Mary Njoki     | mary@shirikisha.com    | password456  | treasurer |
| John Otieno    | john@shirikisha.com    | password123  | secretary |
| Alice Wambui   | alice@shirikisha.com   | alice123     | member    |

> **Note:** Roles are per group. For example, Ernest Kamau is an admin in "Shirikisha Savings Group".

---

## Usage

1. **Login**: Use one of the demo accounts above on the login page.
2. **Dashboard**: View your groups, contributions, and upcoming meetings.
3. **Groups**: Create new chamas, view group details, manage members, and assign roles.
4. **Profile**: View your profile and see your active chamas.

---




## Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

## License
MIT License. © Ernest Kamau 2025

## Acknowledgements
- Built for Kenyan chamas who want transparent, efficient digital tools to grow together.
