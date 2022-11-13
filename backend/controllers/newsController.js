const { User, News } = require("../models")
const { validationResult } = require("express-validator")
const e = require("express")

// create News
const createNews = async (req, res) => {
  const { titleNews, textNews } = req.body
  const result = await News.create({
    titleNews,
    textNews,
    UserId: req.User.id,
  })

  res.status(200).json(result)
}

// getAllNews _____________________________________________________________________________________
const getAllNews = async (req, res) => {
  try {
    result = await News.findAll({
      order: [["createdAt", "DESC"]],
      //   include: [User, Comment],
      include: User,
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
    result = await News.findByPk(req.params.id, { include: User })
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }
    const incrementResult = await result.increment("viewCountNews", { by: 1 })
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
    result = await News.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }

    if (result.UserId === req.User.id) {
      await News.destroy({ where: { id: req.params.id } })
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
  const { titleNews, textNews } = req.body
  try {
    if (!titleNews || !textNews) {
      return res
        .status(400)
        .json({ message: "Please enter all requirement fields" })
    }
    if (!req.User) {
      return res.status(401).json({ message: "User not found" })
    }
    result = await News.findByPk(req.params.id)
    if (!result) {
      return res.status(400).json({ message: "Can't get a News" })
    }

    if (result.UserId === req.User.id) {
      await News.update(
        { titleNews, textNews },
        { where: { id: req.params.id } }
      )
      res.status(200).json({ message: "News was edited successfully" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { createNews, getAllNews, getOneNews, editNews, removeNews }
