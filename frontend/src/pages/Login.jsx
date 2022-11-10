import LoginIcon from "@mui/icons-material/Login"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/auth/authSlice"
import validator from "validator"

const Login = () => {
  const { message, isError, isSuccess, user } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [alertState, setAlertState] = React.useState(false)

  React.useEffect(() => {
    if (isError) {
      setAlertState(true)
    }
    if (isSuccess || user) {
      navigate("/")
    }
  }, [isSuccess, isError, user])

  const [formData, setFormdata] = React.useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  const [errorStatus, setErrorStatus] = React.useState({
    errorEmail: false,
    errorPassword: false,
  })
  const { errorEmail, errorPassword } = errorStatus

  const setFalse = (key) => {
    setErrorStatus((prev) => ({
      ...prev,
      [key]: false,
    }))
  }
  const setTrue = (key) => {
    setErrorStatus((prev) => ({
      ...prev,
      [key]: true,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validator.isEmail(email) && password !== "") {
      await dispatch(loginUser(formData))
    }

    validator.isEmail(email) ? setFalse(errorEmail) : setTrue(errorEmail)

    validator.isEmail(email)
      ? setErrorStatus((prev) => ({ ...prev, errorEmail: false }))
      : setErrorStatus((prev) => ({ ...prev, errorEmail: true }))

    password === "" ? setFalse(errorPassword) : setTrue(errorPassword)

    password === ""
      ? setErrorStatus((prev) => ({ ...prev, errorPassword: true }))
      : setErrorStatus((prev) => ({ ...prev, errorPassword: false }))
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formData, [name]: value.trim() })
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display={"flex"}
      flexDirection="column"
      maxWidth={400}
      alignItems="center"
      boxShadow={"5px 5px 10px #ccc"}
      borderRadius={3}
      padding={3}
      margin={"auto"}
      marginTop={3}
      onSubmit={onSubmit}
    >
      <Typography variant="h3">Login</Typography>

      <TextField
        error={errorEmail}
        helperText={errorEmail ? "Please enter valid email" : ""}
        variant="outlined"
        label="Email"
        type="email"
        margin="normal"
        fullWidth
        autoComplete="on"
        name="email"
        value={email}
        onChange={onChange}
      />
      <TextField
        error={errorPassword}
        helperText={errorPassword ? "Please enter password" : ""}
        variant="outlined"
        label="Password"
        type="password"
        margin="normal"
        fullWidth
        autoComplete="on"
        name="password"
        value={password}
        onChange={onChange}
      />
      {alertState ? (
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      ) : (
        <></>
      )}

      <Button
        variant="contained"
        color="warning"
        sx={{ borderRadius: 3, marginTop: 3 }}
        type="submit"
      >
        Login
      </Button>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button sx={{ borderRadius: 3, marginTop: 3 }}>
          Change to register
        </Button>
      </Link>
    </Box>
  )
}
export default Login
