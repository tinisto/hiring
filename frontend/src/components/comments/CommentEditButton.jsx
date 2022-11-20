import { IconButton, Tooltip } from "@mui/material"
import { Edit } from "@mui/icons-material"

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
