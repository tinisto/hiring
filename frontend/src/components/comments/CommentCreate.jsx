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
import PersonIcon from "@mui/icons-material/Person"

const CommentCreate = ({ id, user }) => {
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
      <Button type="submit">submit</Button>
    </Stack>
  )
}
export default CommentCreate
