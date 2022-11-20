import { ChatBubbleOutline } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ItemOpenCommentFormFromUtils = (props) => {
  const navigate = useNavigate()
  const { singleArticle, link } = props
  return (
    <Stack direction="row" justifyContent="center" alignItems="flex-start">
      <>
        <Tooltip title="Write a comment" arrow>
          <IconButton
            onClick={() =>
              navigate(`/${link}/${singleArticle.id}`, {
                state: "openCommentBox",
              })
            }
          >
            <ChatBubbleOutline />
            <Typography ml={1} variant="body2">
              Write comment
            </Typography>
          </IconButton>
        </Tooltip>
      </>
    </Stack>
  )
}
export default ItemOpenCommentFormFromUtils
