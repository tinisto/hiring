import axios from "axios"
const URL = "/questions"

// createQuestion _____________________________________________________________________________________
const createQuestion = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(URL, formData, config)
  if (response.data) {
    return response.data
  }
}

// getAllQuestion _____________________________________________________________________________________
const getAllQuestion = async () => {
  const response = await axios.get(URL)
  if (response.data) {
    return response.data
  }
}

// getOneQuestionById _____________________________________________________________________________________
const getOneQuestionById = async (id) => {
  const response = await axios.get(`${URL}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editQuestion _____________________________________________________________________________________
const editQuestion = async (formData, token) => {
  const { id } = formData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${URL}/${id}`, formData, config)
  if (response.data) {
    return response.data
  }
}

// deleteQuestion _____________________________________________________________________________________
const deleteQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${URL}/${id}`, config)
  if (response.data) {
    return response.data
  }
}

const questionService = {
  createQuestion,
  getAllQuestion,
  getOneQuestionById,
  editQuestion,
  deleteQuestion,
}

export default questionService
