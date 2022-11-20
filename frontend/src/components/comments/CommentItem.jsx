import { Avatar, Box, Paper, Stack, Tooltip, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateComment } from "../../features/comments/commentSlice"
import React from "react"
import PopoverComponent from "./PopoverComponent"
import CommentEdit from "./CommentEdit"
import PersonIcon from "@mui/icons-material/Person"
import moment from "moment"

const CommentItem = ({ item, ArticleId }) => {
  const dispatch = useDispatch()
  const { commentsSlice_message } = useSelector((state) => state.comments)
  const { user } = useSelector((state) => state.auth)
  const [commentText, setCommentText] = React.useState("")
  const timeago = moment(item.createdAt).fromNow()

  React.useEffect(() => {
    setCommentText(item.commentText)
  }, [])

  const commentData = { id: item.id, ArticleId }
  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  const [openEditBox, setOpenEditBox] = React.useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const commentData = {
      ArticleId,
      commentId: item.id,
      commentText: commentText.trim(),
    }
    console.log("commentText", commentText)
    setOpenEditBox(false)
    dispatch(updateComment(commentData))
  }

  return (
    <>
      <Stack direction="row" spacing={1} margin={2}>
        <Avatar>
          <PersonIcon />
        </Avatar>

        {openEditBox ? (
          <Paper
            sx={{ background: "#f1f2f5", padding: 1, width: 1 }}
            elevation={0}
          >
            <Typography variant="caption" fontWeight={500} va>
              {item?.User?.firstName} {item?.User?.lastName}
            </Typography>
            <CommentEdit
              onSubmit={onSubmit}
              commentText={commentText}
              onChange={onChange}
              setOpenEditBox={setOpenEditBox}
            />
          </Paper>
        ) : (
          <Paper sx={{ background: "#f1f2f5", padding: 1 }} elevation={0}>
            <Typography variant="caption">
              <Box display="inline" fontWeight={500}>
                {item?.User?.firstName} {item?.User?.lastName}
              </Box>
              <Box display="inline" fontWeight={100}>
                {" "}
                &bull; {timeago}
              </Box>
            </Typography>
            <Typography style={{ whiteSpace: "pre-wrap" }} variant="body2">
              {commentText}
            </Typography>
          </Paper>
        )}

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
