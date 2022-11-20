import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../features/auth/authSlice"
import {
  Button,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import PhotoCamera from "@mui/icons-material/PhotoCamera"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const [selectedImage, setSelectedImage] = React.useState()

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage()
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const { firstName, lastName, email } = userData

  const [firstNameAction, setFirstNameAction] = React.useState(false)
  const [lastNameAction, setLastNameAction] = React.useState(false)
  const [emailAction, setEmailAction] = React.useState(false)

  React.useEffect(() => {
    if (!user) {
      navigate("/")
    }
    setUserData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    })
  }, [user])

  const onChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setFirstNameAction(false)
    setLastNameAction(false)
    setEmailAction(false)
    dispatch(updateUser(userData))
  }
  const onSubmitImage = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("selectedImage", selectedImage)
    dispatch(updateUser(selectedImage))
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  }

  return (
    <Container>
      <Typography variant="h4" textAlign={"center"} my={4}>
        General Account Settings
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography fontWeight={500}>First name</Typography>
              </TableCell>

              {firstNameAction ? (
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  autoFocus
                />
              ) : (
                <TableCell>{user?.firstName}</TableCell>
              )}

              <TableCell>
                {firstNameAction ? (
                  <Button onClick={onSubmit} variant="outlined" color="error">
                    Change
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    onClick={() => setFirstNameAction(true)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography fontWeight={500}>Last name</Typography>
              </TableCell>

              {lastNameAction ? (
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  autoFocus
                />
              ) : (
                <TableCell>{user?.lastName}</TableCell>
              )}

              <TableCell>
                {lastNameAction ? (
                  <Button onClick={onSubmit} variant="outlined" color="error">
                    Change
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    onClick={() => setLastNameAction(true)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
export default Profile
