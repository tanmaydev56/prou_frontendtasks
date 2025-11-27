const db = require("../db");

// GET /tasks
exports.getTasks = (req, res) => {
  const sql = `
    SELECT t.*, e.name AS employee_name
    FROM tasks t
    LEFT JOIN employees e ON t.employee_id = e.id
    ORDER BY t.created_at DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch tasks" });
    res.json(rows);
  });
};

// POST /tasks
exports.createTask = (req, res) => {
  const { title, description, employee_id } = req.body;

  if (!title || !employee_id) {
    return res.status(400).json({ error: "title and employee_id are required" });
  }

  const sql = `
    INSERT INTO tasks (title, description, employee_id)
    VALUES (?, ?, ?)
  `;
  const values = [title, description || null, employee_id];

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: "Failed to create task" });

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      status: "TODO",
      employee_id,
    });
  });
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) return res.status(400).json({ error: "status is required" });

  db.run(
    `UPDATE tasks SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to update task" });

      res.json({ message: "Task updated successfully", updatedId: id });
    }
  );
};
