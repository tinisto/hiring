import { ChatBubbleOutline } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"

const OpenCommentFormFromUtils = ({ setOpenCommentBox, openCommentBox }) => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="flex-start">
      <>
        <Tooltip title="Write a comment" arrow>
          <IconButton onClick={() => setOpenCommentBox(!openCommentBox)}>
            <ChatBubbleOutline />
            <Typography ml={1} variant="body2">
              Comment
            </Typography>
          </IconButton>
        </Tooltip>
      </>
    </Stack>
  )
}
export default OpenCommentFormFromUtils
