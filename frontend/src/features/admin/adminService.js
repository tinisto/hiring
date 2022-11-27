import axios from "axios"
const URL = "/admin"

// getAllComments _____________________________________________________________________________________
const getAllComments = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${URL}/comments`, config)
  return response.data
}

// updateComment _____________________________________________________________________________________
const updateComment = async (commentData, token) => {
  const { commentId } = commentData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${URL}/comments/${commentId}`,
    commentData,
    config
  )
  return response.data
}

// deleteComment _____________________________________________________________________________________
const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${URL}/comments/${id}`, config)
  if (response.data) {
    console.log("response.data", response.data)
    return response.data
  }
}

// getAllUsers _____________________________________________________________________________________
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${URL}/users`, config)
  return response.data
}

// getSearch _____________________________________________________________________________________
const getSearch = async (query) => {
  const response = await axios.get(`${URL}/search`)
  return response.data
}

const adminService = {
  getAllComments,
  updateComment,
  deleteComment,
  getAllUsers,
  getSearch,
}
export default adminService
