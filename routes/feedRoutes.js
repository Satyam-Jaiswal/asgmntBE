const express = require("express");
const multer = require("multer");
const { createPost, getPosts } = require("../controllers/feedController");
const protect = require("../middleware/authMiddleware");
const uploadToCloudinary = require("../middleware/cloudinaryMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .post(protect, upload.single("photo"), uploadToCloudinary, createPost)
  .get(protect, getPosts);

module.exports = router;
