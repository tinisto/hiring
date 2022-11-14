import { Alert, Snackbar } from "@mui/material"

const QuestionSnackbar = ({
  openSnackbar,
  handleCloseSnackbar,
  messageQuestion,
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
        {messageQuestion}
      </Alert>
    </Snackbar>
  )
}
export default QuestionSnackbar
