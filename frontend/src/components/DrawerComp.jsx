import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import React from "react"
import { Link } from "react-router-dom"
import { logoutUser } from "../features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"

const DrawerComp = ({ links, user }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { backgroundColor: "rgba(9,9,121,1)" } }}
      >
        <List>
          {links.map((link, index) => (
            <ListItemButton key={index} divider onClick={() => setOpen(false)}>
              <ListItemIcon>
                <Link to={`/${link}`}>
                  <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
                </Link>
              </ListItemIcon>
            </ListItemButton>
          ))}
          {user ? (
            <>
              <ListItemButton divider onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <Link to="/posts/add">
                    <ListItemText sx={{ color: "white" }}>
                      Add Story
                    </ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton divider onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <Link to="/">
                    <ListItemText
                      sx={{ color: "white" }}
                      onClick={() => dispatch(logoutUser())}
                    >
                      Logout
                    </ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton divider onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <Link to="/login">
                    <ListItemText sx={{ color: "white" }}>Login</ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton divider onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <Link to="/register">
                    <ListItemText sx={{ color: "white" }}>
                      Register
                    </ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ marginLeft: "auto", color: "white" }}
      >
        <MenuIcon />
      </IconButton>
    </>
  )
}
export default DrawerComp
