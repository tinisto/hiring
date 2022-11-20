const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require("../models")
const { validationResult } = require("express-validator")
const uuid = require("uuid")
const path = require("path")

// registerUser _____________________________________________________________________________________
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill out all fields" })
  }

  const candidate = await User.findOne({ where: { email } })
  try {
    if (candidate) {
      res.status(500).json({ message: "User already exist" })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await User.create({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email,
        password: hashedPassword,
      })
      const token = jwt.sign({ id: result.id }, process.env.SECRET, {
        expiresIn: "30d",
      })

      res.status(200).json({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        createdAt: result.createdAt,
        createdAt: result.updatedAt,
        token,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// loginUser _____________________________________________________________________________________
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await User.findOne({ where: { email } })

    if (result && (await bcrypt.compare(password, result.password))) {
      const token = jwt.sign({ id: result.id }, process.env.SECRET, {
        expiresIn: "30d",
      })
      res.status(200).json({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        token,
      })
    } else {
      return res.status(400).json({ message: "Wrong credentials" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// updateUser _____________________________________________________________________________________
const updateUser = async (req, res) => {
  const { firstName, lastName, email } = req.body
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Please fill out all fields" })
  }

  const candidate = await User.findOne({ where: { email } })

  try {
    if (!candidate) {
      res.status(400).json({ message: "Can not find User" })
    } else {
      const result = await User.update(
        {
          firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
          lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
          email,
        },
        { where: { email } }
      )
      const updateUser = await User.findOne({ where: { email } })

      const token = jwt.sign({ id: result.id }, process.env.SECRET, {
        expiresIn: "30d",
      })

      res.status(200).json({
        id: updateUser.id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        createdAt: updateUser.createdAt,
        updatedAt: updateUser.updatedAt,
        token,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

// getMe _____________________________________________________________________________________
const getMe = async (req, res) => {
  try {
    const result = await User.findByPk(req.User.id, {
      attributes: { exclude: ["password"] },
    })
    if (!result) {
      return res.status(400).json({ message: "Can't get data" })
    }
    const token = jwt.sign({ id: req.UserId }, process.env.SECRET, {
      expiresIn: "30d",
    })
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { registerUser, loginUser, getMe, updateUser }
