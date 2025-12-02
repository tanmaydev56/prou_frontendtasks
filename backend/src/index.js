require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Initialize database (PostgreSQL)
const db = require("./db");

const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/employees", employeeRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running" });
});

// Start server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
