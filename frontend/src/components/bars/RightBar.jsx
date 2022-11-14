import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import React from "react"

const RightBar = ({ pathname }) => {
  const switchPathname = () => {
    switch (pathname) {
      case "/posts":
        return (
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/posts/add"
          >
            Create post
          </Button>
        )
      case "/tasks":
        return (
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/tasks"
          >
            Create new task
          </Button>
        )
      case "/news":
        return (
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/news/add"
          >
            Create news
          </Button>
        )
      case "/questions":
        return (
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/questions/add"
          >
            Ask a question
          </Button>
        )
      default:
        return null
    }
  }
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      {switchPathname()}
    </Box>
  )
}
export default RightBar
