const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const requireAdmin = require("../middleware/requireAdmin");

// Admin-protected route
router.post("/", requireAdmin, employeeController.addEmployee);

// Public route
router.get("/", employeeController.getEmployees);

module.exports = router;
