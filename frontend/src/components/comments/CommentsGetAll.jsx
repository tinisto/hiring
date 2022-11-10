import { Typography } from "@mui/material"
import CommentItem from "./CommentItem"

const CommentsGetAll = ({ id, commentsSlice_commentsAll, postId }) => {
  return (
    <>
      {commentsSlice_commentsAll.length ? (
        <>
          {commentsSlice_commentsAll.map((item) => (
            <CommentItem key={item.id} item={item} postId={postId} />
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
