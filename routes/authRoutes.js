const express = require("express");
const {
  register,
  login,
  googleAuth,
  verifyToken,
  resetPassword,
  resetPasswordWithToken,
} = require("../controllers/authController");
const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for Google OAuth
router.post("/google", googleAuth);

// Route for verifying token
router.post("/verify-token", verifyToken);

// Route for resetting forgotten password
router.post("/reset-password", resetPassword);

router.post("/changepw", resetPasswordWithToken);

module.exports = router;
