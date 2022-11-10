import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateComment } from "../../features/comments/commentSlice"
import React from "react"
import PopoverComponent from "./PopoverComponent"
import CommentEdit from "./CommentEdit"

const CommentItem = ({ item, postId }) => {
  const dispatch = useDispatch()
  const { message, isError, commentsSlice_message } = useSelector(
    (state) => state.comments
  )
  const { user } = useSelector((state) => state.auth)
  const [commentText, setCommentText] = React.useState("")

  React.useEffect(() => {
    setCommentText(item.commentText)
  }, [])

  const commentData = { id: item.id, postId }
  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  const [openEditBox, setOpenEditBox] = React.useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const commentData = { postId, commentId: item.id, commentText }
    setOpenEditBox(false)
    dispatch(updateComment(commentData))
  }

  return (
    <>
      <Stack direction="row" spacing={1} margin={2}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Paper sx={{ background: "#f1f2f5", padding: 1 }} elevation={0}>
          <Typography variant="body1" fontWeight={500} va>
            {item?.User?.firstName} {item?.User?.lastName}
          </Typography>

          {openEditBox ? (
            <CommentEdit
              onSubmit={onSubmit}
              commentText={commentText}
              onChange={onChange}
              setOpenEditBox={setOpenEditBox}
            />
          ) : (
            <>
              <Typography variant="body2">{commentText}</Typography>
            </>
          )}
        </Paper>

        {user?.id === item?.User?.id && !openEditBox ? (
          <Box>
            <PopoverComponent
              commentData={commentData}
              commentsSlice_message={commentsSlice_message}
              setOpenEditBox={setOpenEditBox}
            />
          </Box>
        ) : (
          <></>
        )}
      </Stack>
    </>
  )
}
export default CommentItem
