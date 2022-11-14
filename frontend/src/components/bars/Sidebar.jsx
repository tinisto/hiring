import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import {
  Home,
  Article,
  Task,
  Newspaper,
  QuestionMark,
  Face,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { Stack } from "@mui/system"
const links = [
  { name: "Home", icon: <Home /> },
  { name: "Posts", icon: <Article /> },
  { name: "News", icon: <Newspaper /> },
  { name: "Questions", icon: <QuestionMark /> },
  { name: "Tasks", icon: <Task /> },
  { name: "About", icon: <Face /> },
]

const Sidebar = ({ user }) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <List>
        {links.map((item) => (
          <ListItem disablePadding key={item.name}>
            <ListItemButton
              component={Link}
              to={
                item.name === "Home" ? "/" : `/${item.name.toLocaleLowerCase()}`
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {!user && (
        <>
          <Divider />
          <Stack spacing={2} marginTop={2}>
            <Typography variant="body2">
              Create an account to follow your favorite communities and start
              taking part in conversations.
            </Typography>
            <Button
              size="small"
              variant="contained"
              component={Link}
              to="/register"
              fullWidth
              sx={{ borderRadius: 4 }}
            >
              Join Us
            </Button>
          </Stack>
        </>
      )}
    </Box>
  )
}
export default Sidebar
