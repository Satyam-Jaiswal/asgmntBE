const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

//DB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.options("*", cors());

// setting up the middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

//Routes

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   console.log(error);
//   res.json(send_formatted_response(error, false, error.message));
// });

module.exports = app;
