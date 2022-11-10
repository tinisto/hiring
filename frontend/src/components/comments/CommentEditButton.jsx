import { IconButton, Tooltip } from "@mui/material"
import { Edit } from "@mui/icons-material"

import { useDispatch } from "react-redux"
import { deleteComment } from "../../features/comments/commentSlice"
import React from "react"

const CommentEditButton = ({ setOpenEditBox }) => {
  return (
    <Tooltip title="Edit" arrow>
      <IconButton color="success" onClick={() => setOpenEditBox(true)}>
        <Edit />
      </IconButton>
    </Tooltip>
  )
}
export default CommentEditButton
