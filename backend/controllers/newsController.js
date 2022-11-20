const { User, News, Article, Comment } = require("../models")
const { validationResult } = require("express-validator")
const CategoryId = 2

// create News
const createNews = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  const { title, text } = req.body
  try {
    const result = await Article.create({
      title,
      text,
      CategoryId,
      UserId: req.User.id,
    })
    res.status(200).json({ result, message: "News added" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" })
  }
}

// getAllNews _____________________________________________________________________________________
const getAllNews = async (req, res) => {
  try {
    result = await Article.findAll({
      where: { CategoryId },
      order: [["createdAt", "DESC"]],
      include: [User, Comment],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

// getOneNews _____________________________________________________________________________________
const getOneNews = async (req, res) => {
  try {
    result = await Article.findByPk(req.params.id, { include: [User, Comment] })
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }
    const incrementResult = await result.increment("viewCount", { by: 1 })
    await result.reload()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// removeNews _____________________________________________________________________________________
const removeNews = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Article.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }

    if (result.UserId === req.User.id) {
      await Article.destroy({ where: { id: req.params.id } })
      res.status(200).json({ id, message: "News deleted" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// editNews _____________________________________________________________________________________
const editNews = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  const { id, title, text } = req.body
  try {
    if (!title || !text) {
      return res
        .status(400)
        .json({ message: "Please enter all requirement fields" })
    }
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Article.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }

    if (result.UserId === req.User.id) {
      const result = await Article.update(
        { title, text },
        { where: { id: req.params.id } }
      )
      res.status(200).json({ result, message: "News was edited successfully" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { createNews, getAllNews, getOneNews, editNews, removeNews }
