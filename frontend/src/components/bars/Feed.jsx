import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <Outlet />
    </Box>
  )
}
export default Feed
