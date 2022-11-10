import { Alert, Snackbar } from "@mui/material"

const CommentSnackbar = ({
  openSnackbar,
  handleCloseSnackbar,
  commentsSlice_message,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
        {commentsSlice_message}
      </Alert>
    </Snackbar>
  )
}
export default CommentSnackbar
