# Task Tracker (Frontend + Backend)

Monorepo with a Node/Express + SQLite backend and a React + Vite frontend for managing employees and their tasks.

---

## Project Structure

```
├─ backend/
│  ├─ package.json
│  ├─ .env
│  ├─ database/
│  │  └─ schema.sql
│  └─ src/
│     ├─ db.js
│     ├─ index.js
│     ├─ controllers/
│     │  ├─ dashboardController.js
│     │  ├─ employeeController.js
│     │  └─ taskController.js
│     └─ routes/
│        ├─ dashboardRoutes.js
│        ├─ employeeRoutes.js
│        └─ taskRoutes.js
└─ frontend/
	 ├─ package.json
	 ├─ index.html
	 ├─ vite.config.js
	 └─ src/
			├─ App.jsx, main.jsx, styles
			├─ components/ (Navbar, ...)
			├─ pages/ (Dashboard, Tasks, AddEmployee, AddTasks)
			└─ services/
				 └─ api.js
```
---
## Tech Stack

- Backend: `Node.js`, `Express`, `sqlite3`, `cors`, `dotenv`
- Frontend: `React`, `Vite`, `axios`, `react-router-dom`, `tailwindcss`

---
## Prerequisites

- Node.js: `>= 20.19.0` (required by Vite 7). If you are on Node `v20.18.0`, upgrade to avoid `EBADENGINE` warnings.
- npm (bundled with Node)

---
## Quick Start

1) Backend

```
cd backend
npm install
npm run dev
```

- Starts on `http://localhost:3000` by default.
- Health check: `GET http://localhost:3000/` → `{ message: "Backend API is running 🚀" }`

2) Frontend

```
cd frontend
npm install
npm run dev
```

- Vite dev server runs at `http://localhost:5173` (by default).
- API base URL is set to `http://localhost:3000` in `frontend/src/services/api.js`.

---
## Environment Variables (backend/.env)

- `PORT` (optional): Server port. Defaults to `3000`.
- `DB_FILE` (optional): Path to the SQLite DB file. Defaults to `backend/database/task-tracker.db`.

Example `.env`:

```
PORT=3000
# DB_FILE=D:\\path\\to\\task-tracker.db
```
---
## Database

- SQLite database is initialized automatically on server start (`src/db.js`).
- Tables:
	- `employees(id, name, email, designation)`
	- `tasks(id, title, description, status, employee_id, created_at)` with foreign key to `employees`.
- Schema reference: `backend/database/schema.sql`.
---
## API Reference

Base URL: `http://localhost:3000`

- `GET /` — Health check

Employees
- `GET /employees` — List employees
- `POST /employees` — Create employee
	- Body: `{ "name": string, "email": string, "designation"?: string }`

Tasks
- `GET /tasks` — List tasks (joined with employee name)
- `POST /tasks` — Create task
	- Body: `{ "title": string, "description"?: string, "employee_id": number }`
- `PUT /tasks/:id` — Update task status
	- Body: `{ "status": "TODO" | "IN_PROGRESS" | "DONE" | string }`

Dashboard
- `GET /dashboard` — Returns task stats
	- Response: `{ totalTasks: number, byStatus: Array<{ status: string, count: number }> }`
---
## Frontend Notes

- Routing: `react-router-dom` with pages in `frontend/src/pages/`.
- API client: `axios` instance in `frontend/src/services/api.js` with `baseURL: "http://localhost:3000"`.
- Styling: Tailwind CSS via Vite plugin.
---
## Scripts

Backend (`backend/package.json`):
- `npm run dev` — Start with nodemon
- `npm start` — Start with Node

Frontend (`frontend/package.json`):
- `npm run dev` — Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Lint sources
---
## Build & Run (Production)

Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd frontend
npm install
npm run build
npm run preview
```
---
## Troubleshooting

- Node engine warning (`EBADENGINE`) on frontend install:
	- Install Node `>= 20.19.0` (or `>= 22.12.0`) to satisfy Vite 7.
- Port conflicts:
	- Change backend `PORT` in `.env` and update `frontend/src/services/api.js` accordingly.
- CORS errors:
	- Backend has `cors` enabled globally; ensure you’re hitting the correct `baseURL` and port.
---
# Architechture Diagram

<img width="2816" height="1536" alt="Gemini_Generated_Image_jh5klrjh5klrjh5k" src="https://github.com/user-attachments/assets/5d934ad7-7118-425f-9a9d-cbbe23e3941e" />



# Flow Diagram

<img width="2816" height="1536" alt="Gemini_Generated_Image_1mtcqz1mtcqz1mtc" src="https://github.com/user-attachments/assets/f9f84d9f-e5be-4d33-894a-551c3e857b36" />

---

## 📸 Screenshots

> Screenshots are available in the `screenshots/` folder inside the repository.

### Dashboard
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/f154461f-9eb7-46e1-b175-cfe0d3a58b3c" />


### Tasks Page
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/ce25f617-213a-4792-b419-2aa94c98bc9e" />


### Add Task
<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/398388ac-24c0-4516-93e5-76fd5f4eeefd" />


### Add Employee
<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/cbdc2d78-ba2f-4ca1-b730-731bf0696717" />


---

## ✨ Features Summary

- Employee management (create employee)
- Task creation with employee assignment
- Update task status (TODO → IN_PROGRESS → DONE)
- Dashboard with task statistics
- Filtering tasks by employee and status
- Responsive UI using Tailwind CSS
- SQLite persistent storage
- Modular backend with MVC architecture

---

## 🧩 Assumptions & Limitations

- Authentication/authorization is not included (all endpoints are open)
- Only basic CRUD operations are implemented (delete operation not exposed in UI)
- Designed for a single-organization use case (no multi-tenant support)
- SQLite is used for simplicity; production deployment may use PostgreSQL/MySQL
- Backend and frontend run separately on local development environment

---

## 📌 Submission Compliance

This repository includes:

- [x] **Frontend Source Code**
- [x] **Backend Source Code**
- [x] **Database Schema / Migration Script (`backend/database/schema.sql`)**
- [x] **Sample Data (optional)**
- [x] **README with architecture, setup, API documentation, screenshots & assumptions**



# prou_frontendtasks





