import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import { useSelector, useDispatch } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import React from "react"
import { logoutUser, reset } from "../../features/auth/authSlice"

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})
const Search = styled("div")((theme) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: 20,
  border: "1px solid #ccc",
}))
const Icons = styled(Box)((theme) => ({
  backgroundColor: "white",
}))

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const settings = ["Profile", "Logout"]
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSomething = (tito) => {
    switch (tito) {
      case "logout":
        dispatch(logoutUser())
        dispatch(reset())
        break
      case "profile":
        navigate("/profile")
        break

      default:
        console.log(`Sorry, we are out of ${tito}.`)
    }
  }

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <StyledToolbar>
          <SentimentSatisfiedAltIcon
            sx={{ display: { xs: "block", sm: "none" } }}
          />
          <Button
            variant="text"
            component={Link}
            to="/"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Blog
          </Button>

          <Search>
            <InputBase placeholder="Search..." />
          </Search>
          <Icons>
            {user ? (
              <>
                <Box marginLeft="auto">
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => handleSomething(setting.toLowerCase())}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button
                  sx={{ marginLeft: "auto", borderRadius: 4 }}
                  variant="outlined"
                  component={Link}
                  to="/register"
                  size="small"
                >
                  Sign Up
                </Button>
                <Button
                  sx={{
                    marginLeft: 1,
                    borderRadius: 4,
                  }}
                  variant="contained"
                  component={Link}
                  to="/login"
                  size="small"
                >
                  Log In
                </Button>
              </>
            )}
          </Icons>
        </StyledToolbar>
      </AppBar>
    </>
  )
}
export default Navbar