import { Box, Button, Stack, TextField } from "@mui/material"

const AdminEditComment = ({
  onSubmit,
  commentText,
  onChange,
  setOpenEditBox,
}) => {
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
        multiline
      />
      <Stack direction="row" justifyContent={"center"} spacing={3} marginY={1}>
        <Button variant="contained" type="submit" size="small">
          Update comment
        </Button>
        <Button
          color="error"
          size="small"
          variant="outlined"
          onClick={() => setOpenEditBox(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}
export default AdminEditComment
