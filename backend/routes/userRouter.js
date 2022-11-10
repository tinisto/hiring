const express = require("express")
const router = express.Router()
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation.js")

const { protect } = require("../middleware/checkAuth.js")
const { checkErrors } = require("../middleware/handleErrors.js")

const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
} = require("../controllers/userController.js")

// register User
// router.post("/register", registerValidation, checkErrors, registerUser)
router.post("/register", registerUser)

// login User
router.post("/login", loginValidation, checkErrors, loginUser)

router.post("/update", updateUser)

router.get("/me", protect, getMe)

module.exports = router
