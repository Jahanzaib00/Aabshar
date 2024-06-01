// src/controllers/goalController.js
const db = require("../config/db");

// Get daily goal
exports.getGoal = (req, res) => {
  db.query(
    "SELECT * FROM daily_goals WHERE user_id = ?",
    [req.query.user_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    }
  );
};

// Set or update daily goal
exports.setGoal = (req, res) => {
  const { userId, goal } = req.body;
  const today = new Date().toISOString().split("T")[0];

  // Check if a goal for the current date already exists
  db.query(
    "SELECT * FROM daily_goals WHERE user_id = ? AND DATE(created_at) = ?",
    [userId, today],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: err.message });
      }

      if (results.length > 0) {
        // If a goal exists, update it
        db.query(
          "UPDATE daily_goals SET goal = ?, updated_at = NOW() WHERE user_id = ? AND DATE(created_at) = ?",
          [goal, userId, today],
          (updateErr, updateResult) => {
            if (updateErr) {
              return res.status(500).json({
                error: "Internal Server Error",
                details: updateErr.message,
              });
            }
            res.status(200).send({ message: "Goal updated successfully" });
          }
        );
      } else {
        // If no goal exists, insert a new one
        db.query(
          "INSERT INTO daily_goals (user_id, goal, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
          [userId, goal],
          (insertErr, insertResult) => {
            if (insertErr) {
              return res.status(500).json({
                error: "Internal Server Error",
                details: insertErr.message,
              });
            }
            res.status(201).send({
              message: "Goal set successfully",
              id: insertResult.insertId,
            });
          }
        );
      }
    }
  );
};
