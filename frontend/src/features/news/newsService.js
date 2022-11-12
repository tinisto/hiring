import axios from "axios"
const URL = "/questions"

// createNews _____________________________________________________________________________________
const createNews = async (formData, token) => {
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

// getAllNews _____________________________________________________________________________________
const getAllNews = async () => {
  const response = await axios.get(URL)
  if (response.data) {
    return response.data
  }
}

// getOneNewsById _____________________________________________________________________________________
const getOneNewsById = async (id) => {
  const response = await axios.get(`${URL}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editNews _____________________________________________________________________________________
const editNews = async (formData, token) => {
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

// deleteNews _____________________________________________________________________________________
const deleteNews = async (id, token) => {
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

const newsService = {
  createNews,
  getAllNews,
  getOneNewsById,
  editNews,
  deleteNews,
}

export default newsService
