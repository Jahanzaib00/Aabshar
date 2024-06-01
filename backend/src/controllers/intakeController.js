// src/controllers/intakeController.js
const db = require("../config/db");

// Get daily water intake log
exports.getIntake = (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'

  db.query(
    "SELECT SUM(amount) AS totalAmount FROM water_intake_entries WHERE user_id = ? AND DATE(date) = ?",
    [req.query.user_id, currentDate],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      // Extract the sum of amounts from the results
      const totalAmount = results[0].totalAmount || 0;
      res.json({ totalAmount });
    }
  );
};

// Log new water intake entry
exports.logIntake = (req, res) => {
  const { user_id, amount } = req.body;
  db.query(
    "INSERT INTO water_intake_entries (user_id, amount, date) VALUES (?, ?, Now())",
    [user_id, amount],
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

//get all logs
exports.getLogs = (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'

  db.query(
    "SELECT * FROM water_intake_entries WHERE user_id = ? AND DATE(date) = ?",
    [req.query.user_id, currentDate],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
};

// Delete Log
exports.deleteLog = (req, res) => {
  db.query(
    "DELETE FROM water_intake_entries WHERE id = ?",
    [req.query.logId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Log not found" });
      }
      res.status(200).json({ message: "Log deleted successfully" });
    }
  );
};

exports.updateLog = (req, res) => {
  const { logId, newAmount } = req.body;
  db.query(
    "UPDATE water_intake_entries SET amount = ? WHERE id = ?",
    [newAmount, logId],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("Log updated successfully");
    }
  );
};

exports.getIntakeHistory = (req, res) => {
  db.query(
    "SELECT DATE(date) AS intake_date, SUM(amount) AS total_amount FROM water_intake_entries GROUP BY DATE(date)",
    (err, results) => {
      if (err) {
        console.error("Error fetching intake history:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    }
  );
};
