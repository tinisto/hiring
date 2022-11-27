const Sequelize = require("sequelize")
const { User, Article, Comment } = require("../models")

const Op = Sequelize.Op

// getSearch _____________________________________________________________________________________
const getSearch = async (req, res) => {
  const { search_query } = req.query
  console.log("search_query", search_query)
  try {
    result = await Article.findAll({
      where: {
        text: { [Op.like]: `%${search_query}%` },
      },
      order: [["createdAt", "DESC"]],
      include: [User],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = {
  getSearch,
}
