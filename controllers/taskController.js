const Task = require("../models/Task");
const send_formatted_response = require("../middleware/send_formatted_response");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status: status,
      user: req.user.id,
    });
    await newTask.save();
    res
      .status(201)
      .json(
        send_formatted_response(newTask, true, "Task created successfully")
      );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error creating task"));
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res
      .status(200)
      .json(
        send_formatted_response(tasks, true, "Tasks retrieved successfully")
      );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error retrieving tasks"));
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json(send_formatted_response({}, false, "Task not found"));
    }
    res
      .status(200)
      .json(
        send_formatted_response(updatedTask, true, "Task updated successfully")
      );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error updating task"));
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json(send_formatted_response({}, false, "Task not found"));
    }
    res
      .status(200)
      .json(send_formatted_response({}, true, "Task deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error deleting task"));
  }
};
