import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import React from "react"
import PersonIcon from "@mui/icons-material/Person"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const CommentPopoverUserInfo = ({ userInfo }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Avatar>
        <IconButton onMouseEnter={() => setOpen(true)}>
          <PersonIcon />
        </IconButton>
      </Avatar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 75, height: 75 }}>
              <PersonIcon sx={{ width: 75, height: 75 }} />
            </Avatar>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={handleClose} size="small">
              Message
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              size="small"
              color="error"
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default CommentPopoverUserInfo
