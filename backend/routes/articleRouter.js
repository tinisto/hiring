const express = require("express")
const router = express.Router()

const { getAllArticle } = require("../controllers/articleController.js")
router.get("/", getAllArticle)

module.exports = router
