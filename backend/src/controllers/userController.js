// src/controllers/userController.js
const db = require("../config/db");

// Signup
exports.signup = (req, res) => {
  const { username, email } = req.body;

  // Insert the user into the database
  db.query(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    [username, email],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).json({ message: "Sign up success" });
    }
  );
};

// Signin
exports.signin = (req, res) => {
  const { email } = req.body;

  // Fetch the user from the database
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send("Invalid email");
    }

    const user = results[0];

    res.status(201).json({ user });
  });
};
