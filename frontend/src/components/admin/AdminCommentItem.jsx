import { Button, Divider, Stack, TableCell, TableRow } from "@mui/material"
import {
  deleteComment,
  updateComment,
  getAllComments,
} from "../../features/admin/adminSlice"
import { useDispatch } from "react-redux"
import moment from "moment"
import React from "react"
import AdminEditComment from "./AdminEditComment"

const AdminCommentItem = ({ item }) => {
  const [commentText, setCommentText] = React.useState("")
  const [openEditBox, setOpenEditBox] = React.useState(false)
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    const commentData = {
      commentId: item?.id,
      commentText: commentText.trim(),
    }
    dispatch(updateComment(commentData))
    dispatch(getAllComments())
    setOpenEditBox(false)
  }

  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  React.useEffect(() => {
    setCommentText(item.commentText)
    dispatch(getAllComments())
  }, [dispatch])

  return (
    <TableRow key={item?.id}>
      <TableCell component="th" scope="row">
        {item?.id}
      </TableCell>

      {openEditBox ? (
        <TableCell component="th" scope="row">
          <AdminEditComment
            onSubmit={onSubmit}
            commentText={commentText}
            onChange={onChange}
            setOpenEditBox={setOpenEditBox}
          />
        </TableCell>
      ) : (
        <TableCell component="th" scope="row">
          {item?.commentText}
        </TableCell>
      )}

      <TableCell component="th" scope="row">
        {item?.User?.firstName} {item?.User?.lastName}
        <Divider sx={{ marginY: 2 }} />
        {moment(item?.createdAt).fromNow()}
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenEditBox(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(deleteComment(item?.id))}
            size="small"
          >
            Delete
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
export default AdminCommentItem
