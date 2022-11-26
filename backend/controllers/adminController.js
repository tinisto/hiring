const Sequelize = require("sequelize")
const Op = Sequelize.Op
const { User, Article, Comment } = require("../models")

// getAllComments _____________________________________________________________________________________
const getAllComments = async (req, res) => {
  try {
    result = await Comment.findAll({
      order: [["createdAt", "DESC"]],
      include: [User],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
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
      res.status(200).json({
        comment,
        commentId,
        commentText,
        message: "Comment updated...",
      })
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
  console.log(id, UserId)

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

// getAllUsers _____________________________________________________________________________________
const getAllUsers = async (req, res) => {
  try {
    result = await User.findAll({
      order: [["createdAt", "DESC"]],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { getAllComments, editComment, deleteComment, getAllUsers }
