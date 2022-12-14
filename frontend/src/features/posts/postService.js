import axios from "axios"
const URL = "/posts"

// createPost _____________________________________________________________________________________
const createPost = async (formData, token) => {
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

// getAllPosts _____________________________________________________________________________________
const getAllPosts = async () => {
  const response = await axios.get(URL)
  if (response.data) {
    return response.data
  }
}

// getOnePostById _____________________________________________________________________________________
const getOnePostById = async (id) => {
  const response = await axios.get(`${URL}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editPost _____________________________________________________________________________________
const editPost = async (formData, token) => {
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

// delete Post _____________________________________________________________________________________
const deletePost = async (id, token) => {
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

const postService = {
  createPost,
  getAllPosts,
  getOnePostById,
  editPost,
  deletePost,
}

export default postService
