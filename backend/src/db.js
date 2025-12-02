const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_FILE || path.join(__dirname, '..', 'database', 'task-tracker.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Database connection error:", err.message);
  else console.log("SQLite DB connected:", dbPath);
});

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'employee',
      designation TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'TODO',
      employee_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      due_date DATE,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
    );
  `);
});

module.exports = db;
