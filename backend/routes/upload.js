const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const uuid = require("uuid")

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, "../uploads/"))
  },
  filename: (_, file, cb) => {
    const fullName = uuid.v4() + path.extname(file.originalname)
    cb(null, fullName)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb("Type file is not access", false)
  }
}

const upload = multer({ storage, fileFilter })
const { protect } = require("../middleware/checkAuth.js")

router.post("/", upload.single("file"), (req, res) => {
  res.json({
    message: "Image uploaded",
  })
})
// router.post("/", protect, upload.single("userImage"), (req, res) => {
//   res.json({
//     message: "Image uploaded",
//   })
// })

module.exports = router
