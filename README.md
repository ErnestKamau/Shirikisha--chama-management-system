# Shirikisha Chama Management System

Shirikisha is a modern web application for managing investment groups (chamas), built with a React frontend and a Flask backend. It helps groups track contributions, manage members and roles, schedule meetings, and share announcements.

---

## Features

- **User Registration & Login**: Secure authentication with JWT.
- **Chama Group Management**: Create, join, and manage multiple groups.
- **Role Management**: Assign roles (admin, treasurer, secretary, member) to group members.
- **Financial Tracking**: Record and view contributions for each group.
- **Meetings**: Schedule and view upcoming meetings.
- **Announcements**: Share important updates with group members.
- **Responsive UI**: Clean, modern interface built with React and Tailwind CSS.

---

## Getting Started

---

## Demo Accounts

After running the seed script, you can log in with any of these demo accounts:

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

## Development

- **Frontend**: React, Vite, Tailwind CSS (`client/`)
- **Backend**: Flask, Flask-RESTful, Flask-JWT-Extended, SQLAlchemy (`server/`)

---

## License

MIT

---

## Contact

For questions or support, please open an issue or contact me at '1.kamauernest@gmail.com'
