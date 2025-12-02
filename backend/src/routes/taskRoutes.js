const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const requireAdmin = require("../middleware/requireAdmin");

// PUBLIC: View tasks
router.get("/", taskController.getTasks);

// ADMIN: Create a task
router.post("/", requireAdmin, taskController.addTask);

// ADMIN: Update a task status
router.put("/:id", requireAdmin, taskController.updateTask);

module.exports = router;
