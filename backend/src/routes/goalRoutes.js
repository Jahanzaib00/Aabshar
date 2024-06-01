// src/routes/goalRoutes.js
const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

router.get("/getGoal", goalController.getGoal);
router.post("/setGoal", goalController.setGoal);

module.exports = router;
