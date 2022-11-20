import axios from "axios"
// const URL = "/posts"

// createArticle,
// getAllArticle,
// getOneArticleById,
// editArticle,
// deleteArticle,

// createArticle _____________________________________________________________________________________
const createArticle = async (formData, token) => {
  const { urlLink } = formData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(`/${urlLink}`, formData, config)
  if (response.data) {
    return response.data
  }
}

// getAllArticle _____________________________________________________________________________________
const getAllArticle = async () => {
  const response = await axios.get("/articles")
  if (response.data) {
    return response.data
  }
}
// getArticlesByCategory _____________________________________________________________________________________
const getArticlesByCategory = async (urlLink) => {
  const response = await axios.get(urlLink)
  if (response.data) {
    return response.data
  }
}

// getOneArticleById _____________________________________________________________________________________
const getOneArticleById = async (data) => {
  const { id, linkSendToData } = data
  const response = await axios.get(`/${linkSendToData}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editArticle _____________________________________________________________________________________
const editArticle = async (data, token) => {
  const { id, linkSendToData } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`/${linkSendToData}/${id}`, data, config)
  if (response.data) {
    return response.data
  }
}

// deleteArticle _____________________________________________________________________________________
const deleteArticle = async (data, token) => {
  const { id, linkSendToData } = data

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`/${linkSendToData}/${id}`, config)
  if (response.data) {
    return response.data
  }
}

const articleService = {
  createArticle,
  getAllArticle,
  getArticlesByCategory,
  getOneArticleById,
  editArticle,
  deleteArticle,
}

export default articleService
