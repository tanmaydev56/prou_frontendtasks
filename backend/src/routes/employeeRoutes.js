const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getEmployees);
router.post("/", employeeController.createEmployee); // 👈 important

module.exports = router;
