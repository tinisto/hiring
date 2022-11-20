import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import {
  getOneArticleById,
  editArticle,
} from "../../features/articles/articleSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"

const QuestionEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const linkSendToData = location.pathname.split("/")[1]
  const { user } = useSelector((state) => state.auth)
  const { singleArticle, isLoading } = useSelector(
    (state) => state.articleStore
  )
  const [text, setText] = React.useState("")

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isLoading) return "...Loading"
    dispatch(getOneArticleById({ id, linkSendToData }))
  }, [user, navigate, dispatch])

  React.useEffect(() => {
    if (singleArticle) {
      setText(singleArticle.text)
    }
  }, [singleArticle])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(editArticle({ id, text, linkSendToData }))
    navigate(`/questions/${id}`, { state: `/questions/${id}` })
  }
  const onChange = (e) => {
    setText(e.target.value)
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
      <Typography variant="h5">Edit your question</Typography>

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
export default QuestionEdit
