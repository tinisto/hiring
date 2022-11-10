import { Box, Button, Stack, TextField } from "@mui/material"

const CommentEdit = ({ onSubmit, commentText, onChange, setOpenEditBox }) => {
  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        type="text"
        name="commentText"
        value={commentText}
        onChange={onChange}
        autoFocus
        size="small"
      />
      <Stack direction="row" justifyContent={"center"} spacing={3} marginY={1}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
        <Button
          color="error"
          size="small"
          onClick={() => setOpenEditBox(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}
export default CommentEdit
