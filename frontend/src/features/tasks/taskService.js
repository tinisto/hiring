import axios from "axios"
const URL = "/tasks"

// createTask _____________________________________________________________________________________
const createTask = async (formData) => {
  const response = await axios.post(URL, formData)
  return response.data
}

// getAllTasks _____________________________________________________________________________________
const getAllTasks = async () => {
  const response = await axios.get(URL)
  return response.data
}

// getTaskByID _____________________________________________________________________________________
const getTaskByID = async (id) => {
  const response = await axios.get(`${URL}/${id}`)
  return response.data
}

// editTask _____________________________________________________________________________________
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
