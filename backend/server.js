require("dotenv").config()
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000
const db = require("./models")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalName)
  },
})

const upload = multer({ storage: storage })

app.use("/upload", upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

// app.use("/uploads", express.static(__dirname + "/uploads"))
// app.use("/upload", require("./routes/upload.js"))
app.use("/auth", require("./routes/userRouter.js"))
app.use("/tasks", require("./routes/taskRoute.js"))
app.use("/posts", require("./routes/postRouter.js"))
app.use("/posts/:postId/comments", require("./routes/commentRouter"))

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}

const startServer = () => {
  try {
    db.sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Server OK on port ${PORT}`)
      })
    })
  } catch (error) {}
}

startServer()
