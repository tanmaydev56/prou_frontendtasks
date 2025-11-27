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

# prou_frontendtasks




