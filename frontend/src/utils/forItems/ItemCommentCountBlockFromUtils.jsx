import { ChatBubbleOutline } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ItemCommentCountBlockFromUtils = (props) => {
  const navigate = useNavigate()
  const { singleArticle, link } = props

  return (
    <Tooltip title="Comments" arrow>
      <IconButton
        onClick={() =>
          navigate(`/${link}/${singleArticle.id}`, {
            state: "openCommentBox",
          })
        }
      >
        <>
          {singleArticle?.Comments?.length === 0 ? null : singleArticle
              ?.Comments?.length === 1 ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ChatBubbleOutline />
              <Typography ml={1} variant="body2">
                {singleArticle?.Comments?.length} comment
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ChatBubbleOutline />
              <Typography ml={1} variant="body2">
                {singleArticle?.Comments?.length} comments
              </Typography>
            </Stack>
          )}
        </>
      </IconButton>
    </Tooltip>
  )
}
export default ItemCommentCountBlockFromUtils
