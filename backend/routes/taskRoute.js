const express = require("express")
const router = express.Router()
const {
  getAllTasks,
  getTaskByID,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController.js")

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTaskByID).put(editTask).delete(deleteTask)

module.exports = router
