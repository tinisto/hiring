import axios from "axios"
const URL = "/posts"

// createArticle,
// getAllArticle,
// getOneArticleById,
// editArticle,
// deleteArticle,

// createArticle _____________________________________________________________________________________
const createArticle = async (formData, token) => {
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

// getAllArticle _____________________________________________________________________________________
const getAllArticle = async (urlLink) => {
  const response = await axios.get("/articles")
  if (response.data) {
    return response.data
  }
}

// getOneArticleById _____________________________________________________________________________________
const getOneArticleById = async (id) => {
  const response = await axios.get(`${URL}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editArticle _____________________________________________________________________________________
const editArticle = async (formData, token) => {
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

// deleteArticle _____________________________________________________________________________________
const deleteArticle = async (id, token) => {
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

const articleService = {
  createArticle,
  getAllArticle,
  getOneArticleById,
  editArticle,
  deleteArticle,
}

export default articleService
