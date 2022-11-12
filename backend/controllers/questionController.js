const { User, Question } = require("../models")
const { validationResult } = require("express-validator")
const e = require("express")

// createQuestion _____________________________________________________________________________________
const createQuestion = async (req, res) => {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json(errors.array())
  //   }

  const { textQuestion } = req.body
  const result = await Question.create({
    textQuestion,
    UserId: req.User.id,
  })

  res.status(200).json(result)
}

// getAllQuestion _____________________________________________________________________________________
const getAllQuestion = async (req, res) => {
  try {
    result = await Question.findAll({
      order: [["createdAt", "DESC"]],
      include: User,
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

// getOneQuestion _____________________________________________________________________________________
const getOneQuestion = async (req, res) => {
  try {
    result = await Question.findByPk(req.params.id, { include: User })
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }
    const incrementResult = await result.increment("viewCountQuestion", {
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
    result = await Question.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }

    if (result.UserId === req.User.id) {
      await Question.destroy({ where: { id: req.params.id } })
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
  const { textQuestion } = req.body
  try {
    if (!textQuestion) {
      return res
        .status(400)
        .json({ message: "Please enter all requirement fields" })
    }
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await Question.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a Question" })
    }

    if (result.UserId === req.User.id) {
      await Question.update({ textQuestion }, { where: { id: req.params.id } })
      res.status(200).json({ message: "Question was edited successfully" })
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
