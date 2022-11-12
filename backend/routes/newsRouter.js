const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")

const {
  createNews,
  getAllNews,
  getOneNews,
  editNews,
  removeNews,
} = require("../controllers/newsController.js")
router.post("/", protect, createNews)
router.get("/", getAllNews)
router.get("/:id", getOneNews)
router.put("/:id", protect, editNews)
router.delete("/:id", protect, removeNews)

module.exports = router
