const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")

const {
  createComment,
  getAllComments,
  getCommentById,
  editComment,
  deleteComment,
} = require("../controllers/commentController.js")

router.get("/", getAllComments)
router.get("/:id", getCommentById)
router.post("/", protect, createComment)
router.put("/:id", protect, editComment)
router.delete("/:id", protect, deleteComment)

module.exports = router
