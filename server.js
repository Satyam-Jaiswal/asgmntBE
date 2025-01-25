const express = require("express");
const mongoose = require("mongoose");

let dotenv = require("dotenv");

// if .env file is located in root directory
dotenv.config();

const app = require("./app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
