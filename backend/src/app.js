// src/index.js
const express = require("express");
const intakeRouter = require("./routes/intakeRoutes");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/intake", intakeRouter);
app.use("/goal", goalRouter);
app.use("/user", userRouter);

module.exports = app;
