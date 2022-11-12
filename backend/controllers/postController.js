const { User, Post, Comment } = require("../models")
const { validationResult } = require("express-validator")
const e = require("express")

// createPost _____________________________________________________________________________________
const createPost = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  const { title, text, tags } = req.body
  const result = await Post.create({
    title,
    text,
    tags,
    UserId: req.User.id,
  })

  res.status(200).json(result)
}

// getAllPost _____________________________________________________________________________________
const getAllPost = async (req, res) => {
  try {
    result = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [User, Comment],
      // include: User,
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

// getOnePost _____________________________________________________________________________________
const getOnePost = async (req, res) => {
  try {
    result = await Post.findByPk(req.params.id, { include: User })
    if (!result) {
      return res.status(400).json({ message: "Can't get a post" })
    }
    const incrementResult = await result.increment("viewsCount", { by: 1 })
    await result.reload()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// removePost _____________________________________________________________________________________
const removePost = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Post.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a post" })
    }

    if (result.UserId === req.User.id) {
      await Post.destroy({ where: { id: req.params.id } })
      res.status(200).json({ id, message: "Post deleted" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// editPost _____________________________________________________________________________________
const editPost = async (req, res) => {
  const { title, text } = req.body
  try {
    if (!title || !text) {
      return res
        .status(400)
        .json({ message: "Please enter all requirement fields" })
    }
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Post.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a post" })
    }

    if (result.UserId === req.User.id) {
      await Post.update({ title, text }, { where: { id: req.params.id } })
      res.status(200).json({ message: "Post was edited successfully" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { createPost, getAllPost, getOnePost, editPost, removePost }
