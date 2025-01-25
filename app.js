const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
let connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const send_formatted_response = require("./middleware/send_formatted_response");
const authMiddleware = require("./middleware/authMiddleware");
const feedRoutes = require("./routes/feedRoutes");
const taskRoutes = require("./routes/taskRoutes");

//DB connection
connectDB();

app.use(cors());
app.options("*", cors());

// setting up the middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

//Routes
app.get("/healthcheck", (req, res) =>
  res.send("Hello World! This is a health check")
);
app.use("/api/auth", authRoutes);
app.use(authMiddleware);
app.use("/api/feed", feedRoutes);
app.use("/api/tasks", taskRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);
  res.json(send_formatted_response(error, false, error.message));
});

module.exports = app;
