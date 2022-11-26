import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import SearchIcon from "@mui/icons-material/Search"
import NewspaperIcon from "@mui/icons-material/Newspaper"

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
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
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))
const Icons = styled(Box)((theme) => ({
  backgroundColor: "white",
}))

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query, setQuery] = React.useState("")

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
  const onSubmit = (e) => {
    e.preventDefault()
    setQuery("")
    console.log("query", query)
    navigate("/search", { state: query })
  }

  const onChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <AppBar position="static" color="inherit">
        <StyledToolbar>
          <Button variant="text" component={Link} to="/">
            <Typography
              variant="button"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Shakopee News
            </Typography>
            <NewspaperIcon sx={{ display: { xs: "block", sm: "none" } }} />
          </Button>
          <Box component="form" onSubmit={onSubmit}>
            <Search sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
              <InputBase
                placeholder="Search..."
                onChange={onChange}
                value={query}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                fullWidth
              />
            </Search>
          </Box>
          <Icons>
            {user ? (
              <>
                <Box marginLeft="auto">
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
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
