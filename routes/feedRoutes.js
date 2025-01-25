const express = require("express");
const { createPost, getPosts } = require("../controllers/feedController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createPost).get(protect, getPosts);

module.exports = router;
