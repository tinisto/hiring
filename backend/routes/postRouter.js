const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")
const { postCreateValidation } = require("../validation/validation.js")
const { checkErrors } = require("../middleware/handleErrors")

const {
  createPost,
  getAllPost,
  getOnePost,
  editPost,
  removePost,
} = require("../controllers/postController.js")
// router.post("/", protect, postCreateValidation, checkErrors, createPost)
router.post("/", protect, createPost)
router.get("/", getAllPost)
router.get("/:id", getOnePost)
// router.put("/:id", protect, postCreateValidation, checkErrors, editPost)
router.put("/:id", protect, editPost)
router.delete("/:id", protect, removePost)

module.exports = router
