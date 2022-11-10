const { body } = require("express-validator")

// registerValidation
const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("firstName", "First name must be at least 5 chars long").isLength({
    min: 2,
  }),
  body("lastName", "Last name must be at least 5 chars long").isLength({
    min: 2,
  }),
  body("password", "Password must be at least 5 chars long").isLength({
    min: 5,
  }),
]

// loginValidation
const loginValidation = [body("email", "Invalid email").isEmail()]

// post Validation
const postCreateValidation = [
  body("title", "Title must be at least 5 chars long").isLength({ min: 5 }),
  body("text", "Text must be at least 10 chars long").isLength({ min: 10 }),
  body("tags", "Please enter tags").optional().isString(),
]

module.exports = { registerValidation, loginValidation, postCreateValidation }
