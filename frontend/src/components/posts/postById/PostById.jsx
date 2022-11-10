import {
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Divider,
  Stack,
} from "@mui/material"
import React from "react"
import { getOnePostById, deletePost } from "../../../features/posts/postSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import PostByIdViewsCommentCountBlock from "./PostByIdViewsCommentCountBlock"
import PostByIdOpenCommentForm from "./PostByIdOpenCommentForm"
import PostByIdIfUserTheSameDeleteEditBlock from "./PostByIdIfUserTheSameDeleteEditBlock"
import PostByIdMainContent from "./PostByIdMainContent"
const { getAllComments } = require("../../../features/comments/commentSlice.js")

const DiaryById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, posts, singlePost } = useSelector((state) => state.posts)
  const [openCommentBox, setOpenCommentBox] = React.useState(false)

  const {
    commentsSlice_isError,
    commentsSlice_isSuccess,
    commentsSlice_isLoading,
    commentsSlice_message,
    commentsSlice_commentsAll,
    commentsSlice_commentSingle,
  } = useSelector((state) => state.comments)
  const { user } = useSelector((state) => state.auth)

  React.useEffect(() => {
    dispatch(getOnePostById(id))
    dispatch(getAllComments(id))
  }, [dispatch, id, commentsSlice_isSuccess, navigate])

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    navigate("/posts")
  }

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Container maxWidth="lg">
            <Paper sx={{ mt: 5, padding: 3 }}>
              <PostByIdMainContent singlePost={singlePost} />
              <Box display={"flex"}>
                <PostByIdViewsCommentCountBlock
                  singlePost={singlePost}
                  commentsSlice_commentsAll={commentsSlice_commentsAll}
                />
                <PostByIdOpenCommentForm
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />

                {user?.id === singlePost?.User?.id && (
                  <PostByIdIfUserTheSameDeleteEditBlock
                    handleDelete={handleDelete}
                    id={id}
                  />
                )}
              </Box>

              {openCommentBox && <CommentCreate user={user} id={id} />}

              {commentsSlice_commentsAll.length > 0 && (
                <CommentsGetAll
                  postId={id}
                  commentsSlice_commentsAll={commentsSlice_commentsAll}
                  id={id}
                />
              )}
            </Paper>
          </Container>
        </>
      )}
    </>
  )
}
export default DiaryById
