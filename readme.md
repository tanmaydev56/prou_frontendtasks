# Prou — Task Management (Frontend)

[![Frontend: React + Vite](https://img.shields.io/badge/frontend-React%20%2B%20Vite-blue)]()
[![Styling: Tailwind CSS](https://img.shields.io/badge/style-TailwindCSS-teal)]()
[![Database: PostgreSQL](https://img.shields.io/badge/db-PostgreSQL-%23336791)]()
[![Deployment: Vercel](https://img.shields.io/badge/deploy-Vercel-black)]()

Last updated: 2025-12-02

---

Table of Contents
- Project overview
- Tech stack
- Features
- Architecture & diagrams
- Database (PostgreSQL)
- Backend API (overview)
- Frontend configuration
- Run & build (local)
- Deployment
- Screenshots
- Limitations & notes
- Contributing
- License
- Backend repo link

---

Project overview 
--------------------------

Prou is a lightweight task management frontend application built with React, Vite and Tailwind CSS and deployed on Vercel. The backend is hosted as a separate service using Node.js + Express + PostgreSQL and deployed on Render. The project migrated away from SQLite and now uses PostgreSQL for production-grade data persistence (schemas, controllers, queries and env configuration updated).

Key updates in this README:
- Full migration from SQLite to PostgreSQL reflected in DB schema and API docs
- RBAC implemented via a simple role system using `x-user-role` header (Admin / User)
- Dashboard improvements (charts, KPIs)
- Forms: validation & UX improvements
- Tables: badges, filters, responsive UI
- Backend moved out of this repo (untracked via .gitignore); this repository is now frontend-only

Tech stack
----------

Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Chart.js

Backend (separate repository — described here but not included)
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- CORS
- dotenv

Backend repo: https://github.com/tanmaydev56/prou_backend (placeholder — replace with real URL when available)

Features (Updated)
------------------
- Create employees (Admin)
- Create tasks (Admin)
- Update task status (Admin)
- Filters: by employee, status, search
- Dashboard: total tasks, completion %, overdue tasks
- Charts + KPIs for quick overview
- RBAC: Admin can create/edit; User can only view (enforced via `x-user-role`)
- PostgreSQL-based backend (secure deployments)
- Fully responsive UI
- Form validation + UX improvements
- Tables with badges, filters, and responsive behaviour

Architecture & flow diagrams
----------------------------

Database (PostgreSQL)
---------------------

The application now uses PostgreSQL in all non-local environments. The final production schema is:

SQL schema
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  designation TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'TODO',
  employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Sample data (example inserts)
```sql
-- Employees
INSERT INTO employees (name, email, designation)
VALUES
  ('Alice Johnson', 'alice@example.com', 'Engineer'),
  ('Bob Smith', 'bob@example.com', 'Designer'),
  ('Carol Lee', 'carol@example.com', 'Product Manager');

-- Tasks
INSERT INTO tasks (title, description, status, employee_id, due_date)
VALUES
  ('Design landing page', 'Create initial designs for landing', 'IN_PROGRESS', 2, '2025-12-10'),
  ('Implement auth flow', 'Add login and role switch', 'TODO', 1, '2025-12-15'),
  ('Sprint planning', 'Prepare next sprint tasks', 'DONE', 3, '2025-11-25');
```

Backend API (Updated for PostgreSQL)
-----------------------------------

Base URL (production): https://backend-prou.onrender.com

Authentication / RBAC
- No JWT. RBAC is enforced by setting the `x-user-role` header on requests (value: `Admin` or `User`).
- Frontend sets `x-user-role` from `localStorage.currentUser.role` via axios interceptor.

API endpoints (summary)

- GET /employees
  - Returns list of employees
  - Public (but Admin actions are validated by the header)

- POST /employees
  - Create a new employee
  - Admin only. Must include `x-user-role: Admin`

- GET /tasks
  - List tasks
  - Supports filters:
    - ?employee_id=<id>
    - ?status=<TODO|IN_PROGRESS|DONE|...>
    - ?search=<text>
    - paging params if implemented

- POST /tasks
  - Create a task
  - Admin only

- PUT /tasks/:id
  - Update task (status, assignee, title, description, due_date)
  - Admin only

- GET /dashboard
  - Returns aggregated stats used on Dashboard:
    - totalTasks
    - completedPercent
    - overdueTasks
    - tasksPerEmployee (array)
    - statusDistribution (for charts)

Example request (curl)
```bash
curl -H "Content-Type: application/json" \
     -H "x-user-role: Admin" \
     "https://backend-prou.onrender.com/tasks?status=TODO"
```

Notes:
- The backend enforces role checks by reading the `x-user-role` request header.
- All production DB connection strings are provided via `DATABASE_URL` environment variable.

Frontend configuration
----------------------

API client (src/services/api.js)

The frontend is pre-configured to point to the Render backend:

```js
// src/services/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "https://backend-prou.onrender.com"
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) config.headers["x-user-role"] = user.role;
  return config;
});
```

Environment variables
- The frontend uses environment variables for local overrides (Vite .env files).
- Example `.env` for local development:
  VITE_API_BASE_URL=https://backend-prou.onrender.com
- Vite reads `VITE_*` variables. If you change the API base URL in `.env`, update `src/services/api.js` accordingly or use `import.meta.env.VITE_API_BASE_URL`.

Node / toolchain
- Node.js: 20.19.0+ is recommended for both frontend dev scripts and server-side deployments
- npm or pnpm supported (npm commands below)
- Vite dev server used for local frontend development

Run & build (local)
-------------------

Prerequisites
- Node 20.19.0+ installed
- PostgreSQL for backend (if running backend locally)
- Backend URL available (production: https://backend-prou.onrender.com)

Frontend — local development
```bash
# 1. Clone repo (frontend-only)
git clone https://github.com/tanmaydev56/prou_frontendtasks.git
cd prou_frontendtasks

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Open http://localhost:5173 (default Vite port)
```

Frontend — build for production
```bash
# Build
npm run build

# Serve locally to test build (optional)
npm run preview
```

Key npm scripts (package.json)
- dev: run Vite dev server
- build: build production bundle (outputs to `dist`)
- preview: preview the built output

Deployment
----------

Frontend (Vercel)
- Create a new project on Vercel and connect the GitHub repository.
- Set build command: npm run build
- Output directory: dist
- Set environment variables (if required) in Vercel (e.g., VITE_API_BASE_URL)
- Vercel will automatically build & deploy on push to main (or your chosen branch)

Backend (Render)
- Create a new Web Service on Render and connect to the backend repository (separate repo).
- Build command: npm install
- Start command: node src/index.js (or use `npm start` if start script defined)
- Add `DATABASE_URL` in Render environment variables
- Provision a PostgreSQL instance on Render and attach/point it via DATABASE_URL
- Ensure CORS is configured to permit your Vercel frontend domain

Environment variables for backend
- DATABASE_URL=postgres://user:pass@host:port/dbname
- PORT (optional)
- Any other secrets (e.g., SMTP creds) as needed

Screenshots
-----------

All existing screenshots are retained in this repo under `screenshots/`. Keep the image files as-is.

- Dashboard
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/093d3423-f173-406c-9a55-317c07868fda" />
- Tasks
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20f6fc76-dcdd-4530-9fdd-c0dd0d36d311" />

- Add Task
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7cf9655-edd6-4240-8e87-5adc977b1c32" />

- Add Employee
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fc82de95-e730-432c-83b3-7d8128728adc" />


Usage & UX notes
----------------
- Role switch: In this app RBAC is simulated locally; the UI allows switching role (Admin / User) and persists selection to `localStorage.currentUser`.
- Admin can access create/edit operations; Users have read-only access to listings and dashboard.
- Filters: Use the UI filters for employee, status and the search box for quick filtering.
- Dashboard: view KPIs, charts (Chart.js) and per-employee breakdowns.

Testing the endpoints
---------------------
- Use the production backend base URL: https://backend-prou.onrender.com
- Example: GET /dashboard
```bash
curl https://backend-prou.onrender.com/dashboard
```

- Create employee (Admin)
```bash
curl -X POST https://backend-prou.onrender.com/employees \
  -H "Content-Type: application/json" \
  -H "x-user-role: Admin" \
  -d '{"name":"John Doe","email":"john@example.com","designation":"Engineer"}'
```

- Create task (Admin)
```bash
curl -X POST https://backend-prou.onrender.com/tasks \
  -H "Content-Type: application/json" \
  -H "x-user-role: Admin" \
  -d '{"title":"New Task","description":"Notes","employee_id":1,"due_date":"2025-12-20"}'
```

Limitations (Updated)
---------------------
- No JWT or token-based authentication — RBAC is implemented via a header and simulated locally with `localStorage`. This is intentional for simplicity.
- Delete operations are **not** included to avoid accidental data loss.
- Multi-role system is simulated locally via `localStorage` only.
- Backend is in a separate repo; this frontend repo does not contain backend code (backend is untracked here; .gitignore excludes it).

Migration notes (SQLite -> PostgreSQL)
-------------------------------------
- The project migrated fully from SQLite to PostgreSQL. All controllers, queries, and environment handling were updated to use `pg` and `DATABASE_URL`.
- The frontend was updated to reference the new backend base URL.
- Ensure any local dev environment that previously used SQLite switches to a local Postgres instance for parity when running backend locally.

Contributing
------------
- Frontend-only contributions are welcome via PRs to this repository.
- Backend changes should be made in the backend repository (placeholder: https://github.com/tanmaydev56/prou_backend).
- When changing the API contract, update the README API docs and coordinate changes between repos.

Backend repository (placeholder)
--------------------------------
- Repo (placeholder): [https://github.com/tanmaydev56/prou_backend](https://github.com/tanmaydev56/backend_PROU)

Contact / Maintainers
---------------------
- Maintainer: tanmaydev56
- For backend questions, open issues in the backend repo (placeholder above).

Acknowledgements
----------------
- Built with React, Vite and Tailwind CSS
- UI charts powered by Chart.js

---

If you'd like, I can:
- create or update this README in the repo with a commit/PR,
- or open a PR that also updates any config values (like Vite env) to reference the Render backend.

