const db = require("../db");

exports.getEmployees = (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch employees" });
    res.json(rows);
  });
};

exports.createEmployee = (req, res) => {
  const { name, email, designation } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const sql = `INSERT INTO employees (name, email, designation) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, designation || null], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to create employee" });
    }
    res.status(201).json({
      id: this.lastID,
      name,
      email,
      designation: designation || null,
    });
  });
};
