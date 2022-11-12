import axios from "axios"
const URL = "post/:postId/comments"

// createComment _____________________________________________________________________________________
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

// getAllComments _____________________________________________________________________________________
const getAllComments = async (postId) => {
  const response = await axios.get(`/posts/${postId}/comments`, postId)
  return response.data
}

// updateComment _____________________________________________________________________________________
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

// deleteComment _____________________________________________________________________________________
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
  updateComment,
  deleteComment,
}
export default commentService
