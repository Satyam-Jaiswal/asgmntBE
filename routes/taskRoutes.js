const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createTask)
  .get(authMiddleware, getTasks);

router
  .route("/:id")
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

module.exports = router;
