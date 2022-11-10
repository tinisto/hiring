import axios from "axios"
const URL = "post/:postId/comments"

// create a comment
const createComment = async (commentData, token) => {
  const { postId } = commentData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `/posts/${postId}/comments`,
    commentData,
    config
  )
  return response.data
}

// update a comment
const updateComment = async (commentData, token) => {
  const { postId, commentId } = commentData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `/posts/${postId}/comments/${commentId}`,
    commentData,
    config
  )
  return response.data
}

// get all comments
const getAllComments = async (postId) => {
  const response = await axios.get(`/posts/${postId}/comments`, postId)
  return response.data
}

// delete comment
const deleteComment = async (commentData, token) => {
  const { postId, id } = commentData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`/posts/${postId}/comments/${id}`, config)
  if (response.data) {
    return response.data
  }
}

const commentService = {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
}
export default commentService
