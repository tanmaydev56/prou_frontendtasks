const db = require("../db");

// -------------------------------------------
// GET /tasks
// -------------------------------------------
exports.getTasks = (req, res) => {
  let query = `
    SELECT t.*, e.name AS employee_name
    FROM tasks t
    LEFT JOIN employees e ON t.employee_id = e.id
    WHERE 1 = 1
  `;

  let params = [];

  if (req.query.status) {
    query += " AND t.status = ?";
    params.push(req.query.status);
  }

  if (req.query.employeeId) {
    query += " AND t.employee_id = ?";
    params.push(req.query.employeeId);
  }

  if (req.query.search) {
    query += " AND t.title LIKE ?";
    params.push(`%${req.query.search}%`);
  }

  query += " ORDER BY t.created_at DESC";

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch tasks" });
    res.json(rows);
  });
};

// -------------------------------------------
// POST /tasks  (Admin Only)
// -------------------------------------------
exports.addTask = (req, res) => {
  // Server-side RBAC (Extra Protection)
  if (req.header("x-user-role") !== "admin") {
    return res.status(403).json({ error: "Only admins can create tasks" });
  }

  const { title, description, employee_id, due_date } = req.body;

  if (!title || !employee_id) {
    return res.status(400).json({
      error: "title and employee_id are required"
    });
  }

  const sql = `
    INSERT INTO tasks (title, description, employee_id, due_date, status)
    VALUES (?, ?, ?, ?, 'TODO')
  `;

  const values = [title, description || null, employee_id, due_date || null];

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: "Failed to create task" });

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      employee_id,
      due_date: due_date || null,
      status: "TODO",
    });
  });
};

// -------------------------------------------
// PUT /tasks/:id  (Admin Only)
// -------------------------------------------
exports.updateTask = (req, res) => {
  // Server-side RBAC (Extra Protection)
  if (req.header("x-user-role") !== "admin") {
    return res.status(403).json({ error: "Only admins can update tasks" });
  }

  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  const sql = `UPDATE tasks SET status = ? WHERE id = ?`;

  db.run(sql, [status, id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to update task" });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      updatedId: id,
    });
  });
};
