const { Post, User, Comment } = require("../models")
const expressAsyncHandler = require("express-async-handler")

// create comment
const createComment = async (req, res) => {
  const { commentText, postId } = req.body
  const UserId = req.User.id
  try {
    const commentCandidate = await Comment.create({
      commentText,
      PostId: postId,
      UserId,
      include: User,
    })
    const comment = await Comment.findByPk(commentCandidate.id, {
      include: User,
    })
    // res.status(200).json({ comment, userData })
    res.status(200).json({ comment, message: "Comment added" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// get all comments
const getAllComments = async (req, res) => {
  const postId = req.baseUrl.split("/")[2]
  console.log("postId", postId)
  try {
    const comment = await Comment.findAll({
      where: { PostId: postId },
      order: [["createdAt", "DESC"]],
      include: User,
    })
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// get comment by id
const getCommentById = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByPk(id, { include: User })
    if (comment) {
      res.status(200).json(comment)
    } else {
      res.status(400).json({ message: "Can't find a comment" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// edit comment
const editComment = async (req, res) => {
  const { commentText, commentId } = req.body
  console.log("req.body", req.body)

  try {
    const candidate = await Comment.findByPk(commentId)
    if (candidate) {
      const comment = await Comment.update(
        { commentText },
        { where: { id: commentId } }
      )
      res.status(200).json({ comment, message: "Comment updated" })
    } else {
      res.status(400).json({ message: "Can't find a comment" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// delete comment
const deleteComment = async (req, res) => {
  const { id } = req.params
  const UserId = req.User.id

  try {
    const comment = await Comment.findByPk(id)

    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }

    // Make sure the logged in user matches the goal user
    if (comment.UserId !== req.User.id) {
      return res.status(401).json({ message: "User not authorized" })
    }

    if (comment) {
      await Comment.destroy({ where: { id } })
      res.status(200).json({ id, message: "Comment deleted,.." })
    } else {
      res.status(400).json({ message: "Can't delete a comment" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  editComment,
  deleteComment,
}
