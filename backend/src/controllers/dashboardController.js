const db = require("../db");

exports.getDashboardData = async (req, res) => {
  try {
    const stats = {};

    // Total tasks
    const total = await db.query("SELECT COUNT(*) AS total FROM tasks");
    stats.totalTasks = parseInt(total.rows[0].total);

    // Completed tasks
    const completed = await db.query(
      "SELECT COUNT(*) AS completed FROM tasks WHERE status = 'DONE'"
    );
    stats.completedTasks = parseInt(completed.rows[0].completed);

    stats.completionRate =
      stats.totalTasks > 0
        ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(1)
        : 0;

    // Overdue tasks
    const overdue = await db.query(
      `
      SELECT COUNT(*) AS overdue
      FROM tasks 
      WHERE due_date IS NOT NULL
      AND due_date < CURRENT_DATE
      AND status != 'DONE'
      `
    );
    stats.overdueTasks = parseInt(overdue.rows[0].overdue);

    // Tasks per employee
    const perEmployee = await db.query(
      `
      SELECT e.name, COUNT(t.id) AS taskCount
      FROM employees e
      LEFT JOIN tasks t ON e.id = t.employee_id
      GROUP BY e.id
      ORDER BY e.id
      `
    );

    stats.tasksPerEmployee = perEmployee.rows;

    res.json(stats);
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};
