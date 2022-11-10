import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../features/auth/authSlice"
import React from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"

const Registration = () => {
  const navigate = useNavigate()
  const [file, setFile] = React.useState(null)

  const [errorStatus, setErrorStatus] = React.useState({
    errorFirstName: false,
    errorLastName: false,
    errorEmail: false,
    errorPassword: false,
  })
  const { errorFirstName, errorLastName, errorEmail, errorPassword } =
    errorStatus

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const { firstName, lastName, email, password } = formData

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append("file", file)

    if (
      validator.isEmail(email) &&
      firstName !== "" &&
      lastName !== "" &&
      password !== ""
    ) {
      // dispatch(registerUser({ formData, data }))
      dispatch(registerUser(formData))
      console.log("formData, data", formData, data)
      navigate("/")
    }

    firstName === ""
      ? setErrorStatus((prev) => ({ ...prev, errorFirstName: true }))
      : setErrorStatus((prev) => ({ ...prev, errorFirstName: false }))

    lastName === ""
      ? setErrorStatus((prev) => ({ ...prev, errorLastName: true }))
      : setErrorStatus((prev) => ({ ...prev, errorLastName: false }))

    validator.isEmail(email)
      ? setErrorStatus((prev) => ({ ...prev, errorEmail: false }))
      : setErrorStatus((prev) => ({ ...prev, errorEmail: true }))

    password === ""
      ? setErrorStatus((prev) => ({ ...prev, errorPassword: true }))
      : setErrorStatus((prev) => ({ ...prev, errorPassword: false }))
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value.trim(),
    })
  }
  const onInputChange = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
    console.log("file", file)
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      display={"flex"}
      flexDirection="column"
      maxWidth={400}
      alignItems="center"
      margin={"auto"}
      marginTop={3}
      boxShadow={"5px 5px 10px #ccc"}
      borderRadius={3}
      padding={3}
      sx={{
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography variant="h3">Registration</Typography>
      <TextField
        error={errorFirstName}
        helperText={errorFirstName ? "Please enter your first name" : ""}
        margin="normal"
        label="First Name"
        type="text"
        variant="outlined"
        fullWidth
        name="firstName"
        value={firstName}
        onChange={onChange}
        autoComplete="on"
      />
      <TextField
        error={errorLastName}
        helperText={errorLastName ? "Please enter your last name" : ""}
        margin="normal"
        label="Last Name"
        type="text"
        variant="outlined"
        fullWidth
        name="lastName"
        value={lastName}
        onChange={onChange}
        autoComplete="on"
      />
      <TextField
        error={errorEmail}
        helperText={errorEmail ? "Please enter valid email" : ""}
        margin="normal"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        name="email"
        value={email}
        onChange={onChange}
        autoComplete="on"
      />
      <TextField
        error={errorPassword}
        helperText={errorPassword ? "Please enter password" : ""}
        margin="normal"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={password}
        onChange={onChange}
        autoComplete="on"
      />

      <Button
        variant="contained"
        color="warning"
        sx={{ borderRadius: 3, marginTop: 3 }}
        type="submit"
      >
        Register
      </Button>
      <Link style={{ textDecoration: "none" }} to="/login">
        <Button sx={{ borderRadius: 3, marginTop: 3 }}>Change to login</Button>
      </Link>
    </Box>
  )
}
export default Registration
