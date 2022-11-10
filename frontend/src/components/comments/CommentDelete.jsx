import { IconButton, Tooltip } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { deleteComment } from "../../features/comments/commentSlice"
import React from "react"

const CommentDelete = ({ commentData }) => {
  const dispatch = useDispatch()

  return (
    <Tooltip title="Delete" arrow>
      <IconButton
        color="error"
        onClick={() => dispatch(deleteComment(commentData))}
      >
        <DeleteForever />
      </IconButton>
    </Tooltip>
  )
}
export default CommentDelete
