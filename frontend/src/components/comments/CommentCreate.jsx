import React from "react"
import { Avatar, Button, Stack, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { createComment } from "../../features/comments/commentSlice"
import { useNavigate } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"

const CommentCreate = ({ id, user, setOpenCommentBox }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [commentText, setCommentText] = React.useState("")
  const onSubmit = (e) => {
    e.preventDefault()
    const sendData = { commentText: commentText.trim(), ArticleId: id }
    dispatch(createComment(sendData))
    setCommentText("")
  }
  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])
  return (
    <Stack
      direction={"row"}
      spacing={2}
      component="form"
      onSubmit={onSubmit}
      width="85%"
      margin="auto"
      marginTop={2}
      alignItems={"center"}
    >
      <Avatar>
        <PersonIcon />
      </Avatar>

      <TextField
        fullWidth
        margin="normal"
        variant="filled"
        label="Write comment..."
        type="text"
        name="commentText"
        value={commentText}
        onChange={onChange}
        autoFocus
        size="small"
        multiline
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" size="small" type="submit">
          submit
        </Button>
        <Button
          color="error"
          size="small"
          variant="outlined"
          onClick={() => setOpenCommentBox(false)}
        >
          Close
        </Button>
      </Stack>
    </Stack>
  )
}
export default CommentCreate
