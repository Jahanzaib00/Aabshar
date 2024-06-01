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
  const { user_id, goal } = req.body;
  db.query(
    "INSERT INTO daily_goals (user_id, goal) VALUES (?, ?) ON DUPLICATE KEY UPDATE goal = ?",
    [user_id, goal, goal],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: result.insertId });
    }
  );
};
