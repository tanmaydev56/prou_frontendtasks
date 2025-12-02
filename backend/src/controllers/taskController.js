const db = require("../db");

// -------------------------------------------
// GET /tasks
// -------------------------------------------
exports.getTasks = async (req, res) => {
  try {
    let query = `
      SELECT t.*, e.name AS employee_name
      FROM tasks t
      LEFT JOIN employees e ON t.employee_id = e.id
      WHERE 1 = 1
    `;
    let params = [];
    let count = 1;

    if (req.query.status) {
      query += ` AND t.status = $${count++}`;
      params.push(req.query.status);
    }

    if (req.query.employeeId) {
      query += ` AND t.employee_id = $${count++}`;
      params.push(req.query.employeeId);
    }

    if (req.query.search) {
      query += ` AND t.title ILIKE $${count++}`;
      params.push(`%${req.query.search}%`);
    }

    query += ` ORDER BY t.created_at DESC`;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// -------------------------------------------
// POST /tasks (Admin Only)
// -------------------------------------------
exports.addTask = async (req, res) => {
  if (req.header("x-user-role") !== "admin") {
    return res.status(403).json({ error: "Only admins can create tasks" });
  }

  const { title, description, employee_id, due_date } = req.body;

  if (!title || !employee_id) {
    return res.status(400).json({
      error: "title and employee_id are required",
    });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO tasks (title, description, employee_id, due_date, status)
      VALUES ($1, $2, $3, $4, 'TODO')
      RETURNING *
      `,
      [title, description || null, employee_id, due_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// -------------------------------------------
// PUT /tasks/:id (Admin Only)
// -------------------------------------------
exports.updateTask = async (req, res) => {
  if (req.header("x-user-role") !== "admin") {
    return res.status(403).json({ error: "Only admins can update tasks" });
  }

  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  try {
    const result = await db.query(
      `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING id`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated", updatedId: id });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
