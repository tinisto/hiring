import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import DrawerComp from "./DrawerComp"
import FaceIcon from "@mui/icons-material/Face"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, reset } from "../features/auth/authSlice"

function Header({ links }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"))
  const [value, setValue] = React.useState(0)
  const { user } = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(reset())
    dispatch(logoutUser())
  }
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
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        {isMatch ? (
          <>
            <Button
              variant="contained"
              color="warning"
              size="small"
              component={Link}
              to="/"
            >
              Blog
            </Button>
            {/* <Link to="/" style={{ color: "white" }}>
              <FaceIcon />
            </Link> */}
            <DrawerComp links={links} user={user} />
          </>
        ) : (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <Grid item xs={2}>
                {/* <Link to="/" style={{ color: "white" }}>
                  <FaceIcon />
                </Link> */}

                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  component={Link}
                  to="/"
                >
                  Blog
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Tabs
                  indicatorColor="secondary"
                  value={value}
                  textColor="inherit"
                  onChange={(e, val) => setValue(val)}
                >
                  {links.map((link, index) => (
                    <Tab
                      key={index}
                      label={link}
                      component={Link}
                      to={`/${link}`}
                    />
                  ))}
                </Tabs>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={5}>
                <Box display={"flex"}>
                  {user ? (
                    <>
                      <Box marginLeft="auto">
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
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
                            <MenuItem
                              key={setting}
                              onClick={handleCloseUserMenu}
                            >
                              <Typography
                                textAlign="center"
                                onClick={() =>
                                  handleSomething(setting.toLowerCase())
                                }
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
                        sx={{
                          marginLeft: "auto",
                          background: "rgba(9,9,121,1)",
                        }}
                        variant="contained"
                        component={Link}
                        to="/login"
                        size="small"
                      >
                        Login
                      </Button>
                      <Button
                        sx={{ marginLeft: 1, background: "rgba(9,9,121,1)" }}
                        variant="contained"
                        component={Link}
                        to="/register"
                        size="small"
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Header
