import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import { getOneNewsById, editNews } from "../../features/news/newsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const DiaryEdit = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [formData, setFormdata] = React.useState({
    titleNews: "",
    textNews: "",
  })
  const { titleNews, textNews } = formData
  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(editNews(formData))
    navigate(`/news/${id}`)
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formData, [name]: value })
  }

  const getData = async (id) => {
    const response = await dispatch(getOneNewsById(id))
    setFormdata(response.payload)
  }
  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    getData(id)
  }, [user, navigate, dispatch])
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
      <Typography variant="h5">Edit your news</Typography>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Title"
        type="text"
        name="titleNews"
        value={titleNews}
        onChange={onChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Text"
        type="text"
        name="textNews"
        value={textNews}
        onChange={onChange}
        multiline
      />
      <Stack direction="row" spacing={2} marginTop={3}>
        <Button variant="contained" type="submit" color="warning">
          Submit
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}
export default DiaryEdit
