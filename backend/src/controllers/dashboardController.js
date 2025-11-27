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
