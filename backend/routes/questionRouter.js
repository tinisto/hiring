const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")

const {
  createQuestion,
  getAllQuestion,
  getOneQuestion,
  editQuestion,
  removeQuestion,
} = require("../controllers/questionController.js")
router.post("/", protect, createQuestion)
router.get("/", getAllQuestion)
router.get("/:id", getOneQuestion)
router.put("/:id", protect, editQuestion)
router.delete("/:id", protect, removeQuestion)

module.exports = router
