// src/controllers/intakeController.js
const db = require("../config/db");

// Get daily water intake log
exports.getIntake = (req, res) => {
  db.query(
    "SELECT * FROM water_intake_entries WHERE user_id = ?",
    [req.query.user_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
};

// Log new water intake entry
exports.logIntake = (req, res) => {
  const { user_id, amount, date } = req.body;
  db.query(
    "INSERT INTO water_intake_entries (user_id, amount, date) VALUES (?, ?, ?)",
    [user_id, amount, date],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: result.insertId });
    }
  );
};

// Get water intake history
exports.getHistory = (req, res) => {
  db.query(
    "SELECT * FROM water_intake_entries WHERE user_id = ? ORDER BY date DESC",
    [req.query.user_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
};
