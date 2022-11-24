const { User, Question, Article, Comment } = require("../models")
const { validationResult } = require("express-validator")
const CategoryId = 3

// createQuestion _____________________________________________________________________________________
const createQuestion = async (req, res) => {
  const { text } = req.body
  console.log("text", text)
  try {
    const result = await Article.create({
      text,
      CategoryId,
      UserId: req.User.id,
    })

    res.status(200).json({ result, message: "Question added" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" })
  }
}

// getAllQuestion _____________________________________________________________________________________
const getAllQuestion = async (req, res) => {
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

// getOneQuestion _____________________________________________________________________________________
const getOneQuestion = async (req, res) => {
  console.log("req.params.id", req.params.id)
  try {
    result = await Article.findByPk(req.params.id, {
      include: [User, Comment],
    })
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }
    const incrementResult = await result.increment("viewCount", {
      by: 1,
    })
    await result.reload()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// removeQuestion _____________________________________________________________________________________
const removeQuestion = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Article.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }

    if (result.UserId === req.User.id) {
      await Article.destroy({ where: { id: req.params.id } })
      res.status(200).json({ id, message: "Question deleted" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// editQuestion _____________________________________________________________________________________
const editQuestion = async (req, res) => {
  const { text } = req.body
  try {
    if (!text) {
      return res
        .status(400)
        .json({ message: "Please enter all requirement fields" })
    }
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Article.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }

    if (result.UserId === req.User.id) {
      const result = await Article.update(
        { text },
        { where: { id: req.params.id } }
      )
      res
        .status(200)
        .json({ result, message: "Question was edited successfully" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = {
  createQuestion,
  getAllQuestion,
  getOneQuestion,
  editQuestion,
  removeQuestion,
}
