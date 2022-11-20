const { body } = require("express-validator")

// registerValidation
const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("firstName").not().isEmpty().trim().escape(),
  body("lastName").not().isEmpty().trim().escape(),
  body("password").not().isEmpty().trim().escape(),
  // body("password", "Password must be at least 5 chars long").isLength({
  //   min: 5,
  // }),
]

// loginValidation
const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password").not().isEmpty().trim().escape(),
]

// postCreateValidation
const postCreateValidation = [
  body("title").not().isEmpty().trim().escape(),
  body("text").not().isEmpty().trim().escape(),

  // body("title", "Title must be at least 5 chars long").isLength({ min: 5 }),
  // body("text", "Text must be at least 10 chars long").isLength({ min: 10 }),
]

// questionCreateValidation
const questionCreateValidation = [body("text").not().isEmpty().trim().escape()]

// newsCreateValidation
const newsCreateValidation = [
  body("title").not().isEmpty().trim().escape(),
  body("text").not().isEmpty().trim().escape(),
]

module.exports = {
  registerValidation,
  loginValidation,
  postCreateValidation,
  newsCreateValidation,
  questionCreateValidation,
}
