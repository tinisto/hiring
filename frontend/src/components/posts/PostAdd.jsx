import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import { createPost, reset } from "../../features/posts/postSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const DiaryAdd = () => {
  const [alertState, setAlertState] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isError, message, isSuccess } = useSelector((state) => state.posts)
  const [formData, setFormdata] = React.useState({
    title: "",
    text: "",
  })
  const { title, text } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createPost(formData))

    if (isSuccess) {
      navigate("/posts")
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formData, [name]: value })
  }
  React.useEffect(() => {
    // dispatch(reset())
    if (!user) {
      navigate("/login")
    }
    if (isError) {
      setAlertState(true)
    }
  }, [user, navigate, isError, reset, dispatch])

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection={"column"}
      width="75%"
      margin="auto"
      marginTop={3}
      alignItems="center"
    >
      <Typography variant="h5">Create your story</Typography>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Title"
        type="text"
        name="title"
        value={title}
        onChange={onChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Text"
        type="text"
        name="text"
        value={text}
        onChange={onChange}
        multiline
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
        type="submit"
        color="warning"
        sx={{ marginTop: 3, borderRadius: 3 }}
      >
        Submit
      </Button>
    </Box>
  )
}
export default DiaryAdd
