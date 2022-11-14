import { Alert, Snackbar } from "@mui/material"

const SnackbarFromUtils = ({ openSnackbar, handleCloseSnackbar, message }) => {
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
        {message}
      </Alert>
    </Snackbar>
  )
}
export default SnackbarFromUtils
