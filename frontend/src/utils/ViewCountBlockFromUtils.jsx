import { Visibility } from "@mui/icons-material"
import { IconButton, Tooltip, Typography } from "@mui/material"

const ViewsCommentCountBlock = (props) => {
  const { singlePost, singleNews, singleQuestion } = props
  const isSinglePostExist = props.hasOwnProperty("singlePost")
  const isSingleNewsExist = props.hasOwnProperty("singleNews")
  const isSingleQuestionExist = props.hasOwnProperty("singleQuestion")

  return (
    <Tooltip title="Views" arrow>
      <IconButton>
        <Visibility />
        {isSinglePostExist && (
          <Typography ml={1} variant="body2">
            {singlePost?.viewCount}
          </Typography>
        )}
        {isSingleNewsExist && (
          <Typography ml={1} variant="body2">
            {singleNews?.viewCount}
          </Typography>
        )}
        {isSingleQuestionExist && (
          <Typography ml={1} variant="body2">
            {singleQuestion?.viewCount}
          </Typography>
        )}
      </IconButton>
    </Tooltip>
  )
}
export default ViewsCommentCountBlock
