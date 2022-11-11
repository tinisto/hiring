import { Box, Button, Stack, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Link } from "react-router-dom"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const RightBar = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Button
        variant="text"
        startIcon={<AddCircleOutlineIcon />}
        component={Link}
        to="/posts/add"
        color="success"
      >
        Create new post
      </Button>
      <Button
        variant="text"
        startIcon={<AddCircleOutlineIcon />}
        component={Link}
        to="/tasks"
        color="error"
      >
        Create new task
      </Button>
    </Box>
  )
}
export default RightBar
