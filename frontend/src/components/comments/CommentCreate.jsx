import React from "react"
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { createComment } from "../../features/comments/commentSlice"
import { useNavigate } from "react-router-dom"

const CommentCreate = ({ id, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [commentText, setCommentText] = React.useState("")
  const onSubmit = (e) => {
    e.preventDefault()
    const sendData = { commentText, postId: id }
    dispatch(createComment(sendData))
    setCommentText("")
  }
  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  React.useEffect(() => {
    // dispatch(reset())
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
      marginTop={5}
      alignItems={"center"}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

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
      />
    </Stack>
  )
}
export default CommentCreate
