import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import React from "react"
import {
  getOneArticleById,
  deleteArticle,
} from "../../../features/articles/articleSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams, useLocation, Link } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import PostByIdMainContent from "./PostByIdMainContent"
import SnackbarFromUtils from "../../../utils/SnackbarFromUtils"
import UserTheSameDeleteEditBlockFromUtils from "../../../utils/UserTheSameDeleteEditBlockFromUtils"
import OpenCommentFormFromUtils from "../../../utils/OpenCommentFormFromUtils"
import CommentCountBlockFromUtils from "../../../utils/CommentCountBlockFromUtils.jsx"
import ViewCountBlockFromUtils from "../../../utils/ViewCountBlockFromUtils"
import NotFoundPage from "../../../pages/NotFoundPage"

const { getAllComments } = require("../../../features/comments/commentSlice.js")

const PostById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const linkSendToData = location.pathname.split("/")[1]
  const { isLoading, singleArticle, message, isError } = useSelector(
    (state) => state.articleStore
  )
  const [openCommentBox, setOpenCommentBox] = React.useState(false)

  React.useEffect(() => {
    if (location.state === "openCommentBox") {
      setOpenCommentBox(true)
    }
  }, [location.state])

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
    const data = { id, linkSendToData }
    dispatch(getOneArticleById(data))
    dispatch(getAllComments(id))
  }, [dispatch, id, commentsSlice_isSuccess, navigate])

  const handleDelete = async (id) => {
    const data = { id, linkSendToData }
    await dispatch(deleteArticle(data))
    navigate("/posts", { state: "/posts" })
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
  // if (isError) return <NotFoundPage />

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 5, padding: 3 }}>
        <Typography variant="caption" component={Link} to="/posts">
          Posts
        </Typography>

        {isLoading ? (
          <Box sx={{ marginY: 2 }}>
            <Stack direction="row" spacing={2} marginY={2}>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Box width={"60%"}>
                <Skeleton />
                <Skeleton width={"50%"} />
              </Box>
            </Stack>

            <Skeleton variant="rounded" width="100%" height={200} />
          </Box>
        ) : (
          <>
            <PostByIdMainContent singleArticle={singleArticle} />
            <Box display="flex" justifyContent="space-between">
              <ViewCountBlockFromUtils singleArticle={singleArticle} />

              {commentsSlice_commentsAll?.length === 0 ? (
                <OpenCommentFormFromUtils
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />
              ) : (
                <CommentCountBlockFromUtils
                  commentsSlice_commentsAll={commentsSlice_commentsAll}
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />
              )}
              {user?.id === singleArticle?.User?.id && (
                <UserTheSameDeleteEditBlockFromUtils
                  handleDelete={handleDelete}
                  link="posts"
                  id={id}
                />
              )}
            </Box>
          </>
        )}

        {/* ------------------------------------------------------ Comment Blog ------------------------------------------------------ */}

        {commentsSlice_isLoading ? (
          <Box marginY={2}>
            <Skeleton width="100%" />
            <Skeleton width="75%" />
            <Skeleton width="50%" />
          </Box>
        ) : (
          <>
            {commentsSlice_commentsAll.length > 0 && (
              <Divider sx={{ marginBottom: 2 }} />
            )}
            {openCommentBox && (
              <CommentCreate
                user={user}
                id={id}
                setOpenCommentBox={setOpenCommentBox}
              />
            )}
            {commentsSlice_commentsAll.length > 0 && (
              <CommentsGetAll
                commentsSlice_commentsAll={commentsSlice_commentsAll}
              />
            )}
          </>
        )}
      </Paper>
      {location.pathname === location.state && message !== "" && (
        <SnackbarFromUtils
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          message={message}
        />
      )}
    </Container>
  )
}
export default PostById
