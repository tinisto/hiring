const { Task } = require("../models")

// getAllTasks _____________________________________________________________________________________
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [["createdAt", "DESC"]] })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// getTaskByID _____________________________________________________________________________________
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

// editTask _____________________________________________________________________________________
const editTask = async (req, res) => {
  try {
    const { id, name, completed } = req.body

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

// deleteTask _____________________________________________________________________________________
const deleteTask = async (req, res) => {
  const { id } = req.params
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

// create a Task _____________________________________________________________________________________
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
