import React from "react"
import { IconButton, Popover, Tooltip } from "@mui/material"
import { MoreHoriz } from "@mui/icons-material"
import CommentDelete from "./CommentDelete"
import CommentEditButton from "./CommentEditButton"
import CommentSnackbar from "./CommentSnackbar"

const PopoverComponentUsersNOTMatch = ({
  commentData,
  setOpenEditBox,
  commentsSlice_message,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  React.useEffect(() => {
    if (commentsSlice_message) {
      setOpenSnackbar(true)
    }
  }, [commentsSlice_message])

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  return (
    <>
      <Tooltip title="Hide or report this" arrow placement="top">
        <IconButton sx={{ color: "black" }} onClick={handleClick}>
          <MoreHoriz />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <CommentEditButton setOpenEditBox={setOpenEditBox} />
        <CommentDelete commentData={commentData} />
      </Popover>
      <>
        <CommentSnackbar
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          commentsSlice_message={commentsSlice_message}
        />
      </>
    </>
  )
}
export default PopoverComponentUsersNOTMatch
