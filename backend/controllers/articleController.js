const { User, Post, Comment, Article } = require("../models")

// getAllArticle _____________________________________________________________________________________
const getAllArticle = async (req, res) => {
  try {
    result = await Article.findAll({
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

module.exports = { getAllArticle }
