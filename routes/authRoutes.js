const express = require("express");
const {
  register,
  login,
  googleAuth,
} = require("../controllers/authController");
const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for Google OAuth
router.post("/google", googleAuth);

module.exports = router;
