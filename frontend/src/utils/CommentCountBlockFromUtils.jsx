import { ChatBubbleOutline } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"

const CommentCountBlockFromUtils = ({
  commentsSlice_commentsAll,
  setOpenCommentBox,
  openCommentBox,
}) => {
  return (
    <Tooltip title="Comments" arrow>
      <IconButton onClick={() => setOpenCommentBox(!openCommentBox)}>
        <>
          {commentsSlice_commentsAll?.length ===
          0 ? null : commentsSlice_commentsAll?.length === 1 ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ChatBubbleOutline />
              <Typography ml={1} variant="body2">
                {commentsSlice_commentsAll?.length} comment
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ChatBubbleOutline />
              <Typography ml={1} variant="body2">
                {commentsSlice_commentsAll?.length} comments
              </Typography>
            </Stack>
          )}
        </>
      </IconButton>
    </Tooltip>
  )
}
export default CommentCountBlockFromUtils
