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

1. **Login**: Use one of the demo accounts above on the login page. OR CREATE a NEW ACCOUNT
2. **Dashboard**: View your groups, contributions, and upcoming meetings.
3. **Groups**: Create new chamas, view group details, manage members, and assign roles.
4. **Profile**: View your profile and see your active chamas.

---
### Breakdown of Concepts Used in Shirikisha Chama Management System

**1. Views (Frontend Components)**
- **Description:** The user interface is built with React, using modular components for each feature (e.g., group details, member management, meetings, contributions).
- **Where Used:**  
  - Pages like ChamaDetailPage.jsx, ChamaGroupsPage.jsx, and modals in `/components/` directory.

**2. RESTful API**
- **Description:** The backend exposes RESTful endpoints for CRUD operations on resources such as groups, members, meetings, and contributions.
- **Where Used:**  
  - Endpoints like `/api/group`, `/api/groups/:group_id/meetings`, `/api/groups/:group_id/contributions/:contribution_id` in Flask controllers.
  - Consumed in the frontend via Axios (see `utils/axios.js`).

**3. JWT Token Authentication**
- **Description:** Authentication is handled using JSON Web Tokens (JWT). Users log in and receive a token, which is sent with each API request for authorization.
- **Where Used:**  
  - Backend: JWT setup in config.py and required on protected routes using `@jwt_required()`.
  - Frontend: Token stored in `localStorage` and attached to requests via Axios.

**4. CORS (Cross-Origin Resource Sharing)**
- **Description:** Allows the frontend (React app) and backend (Flask API) to communicate even if served from different origins during development.
- **Where Used:**  
  - Enabled in backend via `CORS(app)` in config.py.

**5. Role-Based Access Control**
- **Description:** Different user roles (admin, secretary, treasurer, member) have different permissions for actions.
- **Where Used:**  
  - Backend: Role checks in API endpoints (e.g., only secretaries can schedule meetings).
  - Frontend: UI elements conditionally rendered based on role (see `isAdmin`, `isSecretary`, `isTreasurer` in ChamaDetailPage.jsx).

**6. ORM-Based Data Modeling (SQLAlchemy)**
- **Description:** SQLAlchemy models represent entities like User, ChamaGroup, Membership, Contribution, Meeting, etc., with relationships between them.
- **Where Used:**  
  - Defined in models (e.g., user.py, chama_group.py, contribution.py).

**7. Database Migration Management (Alembic)**
- **Description:** Alembic is used for managing database schema changes and migrations.
- **Where Used:**  
  - Migration scripts in migrations.

**8. State Management (React Hooks)**
- **Description:** React’s `useState` and `useEffect` manage local component state and side effects like data fetching.
- **Where Used:**  
  - Throughout frontend components (e.g., ChamaDetailPage.jsx).

**9. Protected Routes**
- **Description:** Certain pages and API endpoints are only accessible to authenticated users.
- **Where Used:**  
  - Backend: `@jwt_required()` on protected resources.
  - Frontend: Token checks and route guards.

**10. Form Handling & Validation**
- **Description:** Forms are used for user input (e.g., creating groups, scheduling meetings, editing contributions), with basic validation and error handling.
- **Where Used:**  
  - Modals and pages like `EditContributionModal.jsx`, `ScheduleMeetingModule.jsx`, CreateChama.jsx.

**11. Error Handling**
- **Description:** Errors from API calls are caught and displayed to the user.
- **Where Used:**  
  - `try/catch` blocks in frontend API calls, error messages in UI.

**12. Responsive Design & Styling**
- **Description:** Tailwind CSS is used for consistent, responsive, and modern UI styling.
- **Where Used:**  
  - All frontend components (see class names like `bg-white rounded-lg shadow-lg`).

**13. Data Serialization**
- **Description:** Backend uses serialization to convert SQLAlchemy models to JSON for API responses.
- **Where Used:**  
  - `SerializerMixin` in models (e.g., chama_group.py).

**14. Database Seeding**
- **Description:** The backend can be seeded with initial data for development/testing.
- **Where Used:**  
  - seed.py script.

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
