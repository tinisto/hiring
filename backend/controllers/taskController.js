const { Task } = require("../models")

// get all Task
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [["createdAt", "DESC"]] })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// getTaskByID
const getTaskByID = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(400).json({ msg: `Can not find a Task with id: ${id}` })
    } else {
      res.status(200).json(task)
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// editTask
const editTask = async (req, res) => {
  try {
    const { id, name, completed } = req.body

    console.log("req.body", req.body)

    await Task.update(
      req.body,

      { where: { id: req.params.id } }
    )
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Can not edit the Task with id: ${id}` })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msq: error.message })
  }
}

// deleteTask
const deleteTask = async (req, res) => {
  const { id } = req.params
  console.log("id", id)
  try {
    const task = await Task.destroy({ where: { id } })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` })
    }
    res.status(200).json(id)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// create a Task
const createTask = async (req, res) => {
  try {
    const { name, email } = req.body
    const task = await Task.create(req.body)
    if (!task) {
      return res.status(404).json({ msg: "Can not create a task" })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { getAllTasks, getTaskByID, createTask, editTask, deleteTask }
