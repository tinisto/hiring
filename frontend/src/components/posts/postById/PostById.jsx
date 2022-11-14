import { Box, Container, Paper } from "@mui/material"
import React from "react"
import {
  getOnePostById,
  deletePost,
  reset,
} from "../../../features/posts/postSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import PostByIdMainContent from "./PostByIdMainContent"
import SnackbarFromUtils from "../../../utils/SnackbarFromUtils"
import UserTheSameDeleteEditBlockFromUtils from "../../../utils/UserTheSameDeleteEditBlockFromUtils"
import OpenCommentFormFromUtils from "../../../utils/OpenCommentFormFromUtils"
import ViewsCommentCountBlock from "../../../utils/ViewCountBlockFromUtils"

const { getAllComments } = require("../../../features/comments/commentSlice.js")

const DiaryById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, singlePost, message } = useSelector((state) => state.posts)
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

  // snackbar
  React.useEffect(() => {
    if (message) {
      setOpenSnackbar(true)
    }
  }, [message])
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
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
                <ViewsCommentCountBlock singlePost={singlePost} />

                <OpenCommentFormFromUtils
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />

                {user?.id === singlePost?.User?.id && (
                  <UserTheSameDeleteEditBlockFromUtils
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
      <SnackbarFromUtils
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
    </>
  )
}
export default DiaryById
