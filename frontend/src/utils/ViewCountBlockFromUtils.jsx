import { Visibility } from "@mui/icons-material"
import { IconButton, Tooltip, Typography } from "@mui/material"

const ViewCountBlockFromUtils = ({ singleArticle }) => {
  return (
    <Tooltip title="Views" arrow>
      <IconButton>
        <Visibility />
        <Typography ml={1} variant="body2">
          {singleArticle?.viewCount}
        </Typography>
      </IconButton>
    </Tooltip>
  )
}
export default ViewCountBlockFromUtils
