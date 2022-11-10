const jwt = require("jsonwebtoken")
const { User } = require("../models")

const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.SECRET)
      req.User = await User.findByPk(decoded.id)
      next()
    } catch (error) {
      return res.status(500).json({ message: "Not authorized" })
    }
  }

  if (!token) {
    return res.status(500).json({ message: "Not authorized" })
  }
}

module.exports = { protect }
