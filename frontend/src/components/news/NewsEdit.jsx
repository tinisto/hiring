import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import {
  getOneArticleById,
  editArticle,
} from "../../features/articles/articleSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReactQuill from "react-quill"

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

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isLoading) return "...Loading"
    dispatch(getOneArticleById({ id, linkSendToData }))
  }, [user, navigate, dispatch])

  React.useEffect(() => {
    if (singleArticle) {
      setValue(singleArticle.text)
    }
  }, [singleArticle])

  const onSubmit = (e) => {
    e.preventDefault()
    const result = value.replace(/(<p><br><\/p>)/g, "")
    const result1 = result.replace(/(<\/p><p>)/g, "<br>")
    dispatch(editArticle({ id, text: result1, linkSendToData }))
    navigate(`/news/${id}`, { state: `/news/${id}` })
  }
  const [value, setValue] = React.useState("")

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      margin="auto"
      marginTop={3}
      alignItems="center"
    >
      <Typography variant="h5">Edit your news</Typography>
      <ReactQuill theme="snow" value={value} onChange={setValue} />

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
