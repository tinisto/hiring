import { Box, Container, Paper } from "@mui/material"
import React from "react"
import { getOneNewsById, deleteNews } from "../../../features/news/newsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import NewsByIdMainContent from "./NewsByIdMainContent"
import SnackbarFromUtils from "../../../utils/SnackbarFromUtils"
import OpenCommentFormFromUtils from "../../../utils/OpenCommentFormFromUtils"
import UserTheSameDeleteEditBlockFromUtils from "../../../utils/UserTheSameDeleteEditBlockFromUtils"
import ViewsCommentCountBlock from "../../../utils/ViewCountBlockFromUtils"

const { getAllComments } = require("../../../features/comments/commentSlice.js")

const NewsById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, singleNews, message } = useSelector((state) => state.news)
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
    dispatch(getOneNewsById(id))
    dispatch(getAllComments(id))
  }, [dispatch, id, commentsSlice_isSuccess, navigate])

  const handleDelete = async (id) => {
    await dispatch(deleteNews(id))
    navigate("/news")
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
              <NewsByIdMainContent singleNews={singleNews} />
              <Box display={"flex"}>
                <ViewsCommentCountBlock singleNews={singleNews} />

                <OpenCommentFormFromUtils
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />

                {user?.id === singleNews?.User?.id && (
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
export default NewsById
