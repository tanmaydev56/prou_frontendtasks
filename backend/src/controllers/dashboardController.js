const db = require("../db");

exports.getStats = (req, res) => {
  const stats = {};

  db.get("SELECT COUNT(*) AS total FROM tasks", [], (err, row) => {
    stats.totalTasks = row.total;

    db.all(
      `SELECT status, COUNT(*) AS count FROM tasks GROUP BY status`,
      [],
      (err2, rows2) => {
        stats.byStatus = rows2;
        res.json(stats);
      }
    );
  });
};

exports.getDashboardData = (req, res) => {
  const stats = {};

  db.get(`SELECT COUNT(*) AS total FROM tasks`, (err, row) => {
    stats.totalTasks = row.total;

    db.get(
      `SELECT COUNT(*) AS completed FROM tasks WHERE status = 'DONE'`,
      (err2, row2) => {
        stats.completedTasks = row2.completed;
        stats.completionRate = stats.totalTasks
          ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(1)
          : 0;

        db.get(
          `SELECT COUNT(*) AS overdue FROM tasks 
           WHERE due_date IS NOT NULL 
           AND due_date < DATE('now') 
           AND status != 'DONE'`,
          (err3, row3) => {
            stats.overdueTasks = row3.overdue;

            db.all(
              `SELECT e.name, COUNT(t.id) AS taskCount
               FROM employees e 
               LEFT JOIN tasks t ON e.id = t.employee_id
               GROUP BY e.id`,
              (err4, rows4) => {
                stats.tasksPerEmployee = rows4;

                res.json(stats);
              }
            );
          }
        );
      }
    );
  });
};

