import axios from "axios"
const URL = "/posts"

// createPost
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

// getPosts
const getPosts = async () => {
  const response = await axios.get(URL)
  if (response.data) {
    return response.data
  }
}

// delete Post
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

// getOnePostById
const getOnePostById = async (id) => {
  const response = await axios.get(`${URL}/${id}`, id)
  if (response.data) {
    return response.data
  }
}

// editPost
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

const postService = {
  createPost,
  getPosts,
  deletePost,
  getOnePostById,
  editPost,
}

export default postService
