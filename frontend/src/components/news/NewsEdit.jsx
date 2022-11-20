import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import {
  getOneArticleById,
  editArticle,
} from "../../features/articles/articleSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"

const NewsEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const linkSendToData = location.pathname.split("/")[1]
  const { user } = useSelector((state) => state.auth)
  const { singleArticle, isLoading } = useSelector(
    (state) => state.articleStore
  )
  const [formData, setFormdata] = React.useState({
    title: "",
    text: "",
  })
  const { title, text } = formData

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isLoading) return "...Loading"
    dispatch(getOneArticleById({ id, linkSendToData }))
  }, [user, navigate, dispatch])

  React.useEffect(() => {
    if (singleArticle) {
      setFormdata({ title: singleArticle.title, text: singleArticle.text })
    }
  }, [singleArticle])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(editArticle({ id, title, text, linkSendToData }))
    navigate(`/news/${id}`, { state: `/news/${id}` })
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formData, [name]: value })
  }

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
export default NewsEdit
