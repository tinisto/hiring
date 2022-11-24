const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")
const { questionCreateValidation } = require("../validation/validation.js")
const { checkErrors } = require("../middleware/handleErrors")

const {
  createQuestion,
  getAllQuestion,
  getOneQuestion,
  editQuestion,
  removeQuestion,
} = require("../controllers/questionController.js")
// router.post("/", protect, questionCreateValidation, checkErrors, createQuestion)
router.post("/", protect, createQuestion)
router.get("/", getAllQuestion)
router.get("/:id", getOneQuestion)
// router.put("/:id", protect, questionCreateValidation, checkErrors, editQuestion)
router.put("/:id", protect, editQuestion)
router.delete("/:id", protect, removeQuestion)

module.exports = router
