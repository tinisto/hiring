const { Post, User, Comment } = require("../models")
const expressAsyncHandler = require("express-async-handler")

// createComment _____________________________________________________________________________________
const createComment = async (req, res) => {
  const { commentText, ArticleId } = req.body
  const UserId = req.User.id
  try {
    const commentCandidate = await Comment.create({
      commentText,
      ArticleId,
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

// getAllComments _____________________________________________________________________________________
const getAllComments = async (req, res) => {
  const ArticleId = req.baseUrl.split("/")[2]
  try {
    const comment = await Comment.findAll({
      where: { ArticleId },
      order: [["createdAt", "DESC"]],
      include: User,
    })
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// getCommentById _____________________________________________________________________________________
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

// editComment _____________________________________________________________________________________
const editComment = async (req, res) => {
  const { commentText, commentId } = req.body

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

// deleteComment _____________________________________________________________________________________
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
