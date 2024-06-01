// src/routes/intakeRoutes.js
const express = require("express");
const router = express.Router();
const intakeController = require("../controllers/intakeController");

router.get("/getIntake", intakeController.getIntake);
router.post("/logIntake", intakeController.logIntake);
router.get("/getHistory", intakeController.getHistory);
router.get("/getLogs", intakeController.getLogs);
router.delete("/deleteLog", intakeController.deleteLog);
router.put("/updateLog", intakeController.updateLog);
router.get("/getIntakeHistory", intakeController.getIntakeHistory);

module.exports = router;
