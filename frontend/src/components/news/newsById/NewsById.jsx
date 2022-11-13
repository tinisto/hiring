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
import { getOneNewsById, deleteNews } from "../../../features/news/newsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import NewsByIdViewsCommentCountBlock from "./NewsByIdViewsCommentCountBlock"
import NewsByIdOpenCommentForm from "./NewsByIdOpenCommentForm"
import NewsByIdIfUserTheSameDeleteEditBlock from "./NewsByIdIfUserTheSameDeleteEditBlock"
import NewsByIdMainContent from "./NewsByIdMainContent"
const { getAllComments } = require("../../../features/comments/commentSlice.js")

const NewsById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, allNews, singleNews } = useSelector((state) => state.news)
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
                <NewsByIdViewsCommentCountBlock
                  singleNews={singleNews}
                  commentsSlice_commentsAll={commentsSlice_commentsAll}
                />
                <NewsByIdOpenCommentForm
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />

                {user?.id === singleNews?.User?.id && (
                  <NewsByIdIfUserTheSameDeleteEditBlock
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
export default NewsById
