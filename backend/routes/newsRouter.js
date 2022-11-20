const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/checkAuth.js")
const { newsCreateValidation } = require("../validation/validation.js")
const { checkErrors } = require("../middleware/handleErrors")

const {
  createNews,
  getAllNews,
  getOneNews,
  editNews,
  removeNews,
} = require("../controllers/newsController.js")
router.post("/", protect, newsCreateValidation, checkErrors, createNews)
router.get("/", getAllNews)
router.get("/:id", getOneNews)
router.put("/:id", protect, newsCreateValidation, checkErrors, editNews)
router.delete("/:id", protect, removeNews)

module.exports = router
