// src/models/setup.js
const db = require("../config/db");

// Create Database
db.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (err, result) => {
    if (err) throw err;
    console.log("Database created or already exists");

    // Use the created database
    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      // Create Users Table
      const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
      )
    `;
      db.query(createUsersTable, (err, result) => {
        if (err) throw err;
        console.log("Users table created or already exists");
      });

      // Create Water Intake Entries Table
      const createWaterIntakeEntriesTable = `
      CREATE TABLE IF NOT EXISTS water_intake_entries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        amount INT NOT NULL,
        date DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
      db.query(createWaterIntakeEntriesTable, (err, result) => {
        if (err) throw err;
        console.log("Water Intake Entries table created or already exists");
      });

      // Create Daily Goals Table
      const createDailyGoalsTable = `
      CREATE TABLE IF NOT EXISTS daily_goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        goal INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
      db.query(createDailyGoalsTable, (err, result) => {
        if (err) throw err;
        console.log("Daily Goals table created or already exists");
      });
    });
  }
);
