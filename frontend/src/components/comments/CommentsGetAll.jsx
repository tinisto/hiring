import { Typography } from "@mui/material"
import CommentItem from "./CommentItem"

const CommentsGetAll = ({ commentsSlice_commentsAll }) => {
  return (
    <>
      {commentsSlice_commentsAll.length ? (
        <>
          {commentsSlice_commentsAll.map((item) => (
            <CommentItem key={item.id} item={item} ArticleId={item.ArticleId} />
          ))}
        </>
      ) : (
        <>
          <Typography marginTop={3} textAlign={"center"} variant="h6">
            No comments
          </Typography>
        </>
      )}
    </>
  )
}
export default CommentsGetAll
