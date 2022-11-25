const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")
const {
  getAllComments,
  editComment,
  deleteComment,
  getAllUsers,
} = require("../controllers/adminController.js")

router.get("/comments", getAllComments)
router.get("/users", protect, getAllUsers)
router.put("/comments/:id", protect, editComment)
router.delete("/comments/:id", protect, deleteComment)

module.exports = router
