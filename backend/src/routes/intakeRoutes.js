// src/routes/intakeRoutes.js
const express = require("express");
const router = express.Router();
const intakeController = require("../controllers/intakeController");

router.get("/getIntake", intakeController.getIntake);
router.post("/logIntake", intakeController.logIntake);
router.get("/getHistory", intakeController.getHistory);

module.exports = router;
