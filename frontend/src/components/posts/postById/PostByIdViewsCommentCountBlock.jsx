import { Visibility } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"

const PostByIdViewsCommentCountBlock = ({
  singlePost,
  commentsSlice_commentsAll,
}) => {
  return (
    <Box marginRight={"auto"} display="flex" alignItems={"center"}>
      <Tooltip title="Views" arrow>
        <IconButton>
          <Visibility />
          <Typography ml={1} variant="body2">
            {singlePost?.viewsCount}
          </Typography>
        </IconButton>
      </Tooltip>
      <Typography ml={1} variant="body2">
        {commentsSlice_commentsAll?.length === 0 ? (
          <></>
        ) : commentsSlice_commentsAll?.length === 1 ? (
          `${commentsSlice_commentsAll?.length} Comment`
        ) : (
          `${commentsSlice_commentsAll?.length} Comments`
        )}
      </Typography>
    </Box>
  )
}
export default PostByIdViewsCommentCountBlock
