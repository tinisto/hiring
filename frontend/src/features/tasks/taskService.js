import axios from "axios"
const URL = "/tasks"

// createTask
const createTask = async (formData) => {
  const response = await axios.post(URL, formData)
  return response.data
}

// getAllTasks
const getAllTasks = async () => {
  const response = await axios.get(URL)
  return response.data
}

// getTaskByID
const getTaskByID = async (id) => {
  const response = await axios.get(`${URL}/${id}`)
  return response.data
}

// editTask
const editTask = async (formData) => {
  const { id, name, completed } = formData

  const response = await axios.put(`${URL}/${id}`, { id, name, completed })
  return response.data
}

// deleteTask
const deleteTask = async (id) => {
  const response = await axios.delete(`${URL}/${id}`)
  return response.data
}

const taskService = {
  createTask,
  getAllTasks,
  getTaskByID,
  editTask,
  deleteTask,
}

export default taskService
