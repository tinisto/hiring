import { Box, Container, Paper } from "@mui/material"
import React from "react"
import {
  getOneQuestionById,
  deleteQuestion,
} from "../../../features/questions/questionSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CommentCreate from "../../comments/CommentCreate"
import CommentsGetAll from "../../comments/CommentsGetAll"
import QuestionByIdViewsCommentCountBlock from "./QuestionByIdViewsCommentCountBlock"
import QuestionByIdMainContent from "./QuestionByIdMainContent"
import SnackbarFromUtils from "../../../utils/SnackbarFromUtils"
import UserTheSameDeleteEditBlockFromUtils from "../../../utils/UserTheSameDeleteEditBlockFromUtils"
import OpenCommentFormFromUtils from "../../../utils/OpenCommentFormFromUtils"
import ViewsCommentCountBlock from "../../../utils/ViewCountBlockFromUtils"

const { getAllComments } = require("../../../features/comments/commentSlice.js")

const QuestionById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoadingQuestion, singleQuestion, messageQuestion } = useSelector(
    (state) => state.questions
  )

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
    dispatch(getOneQuestionById(id))
    dispatch(getAllComments(id))
  }, [dispatch, id, commentsSlice_isSuccess, navigate])

  React.useEffect(() => {
    if (messageQuestion) {
      setOpenSnackbar(true)
    }
  }, [messageQuestion])

  const handleDelete = async (id) => {
    await dispatch(deleteQuestion(id))
    navigate("/questions")
  }

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      {isLoadingQuestion ? (
        <>Loading...</>
      ) : (
        <>
          <Container maxWidth="lg">
            <Paper sx={{ mt: 5, padding: 3 }}>
              <QuestionByIdMainContent singleQuestion={singleQuestion} />
              <Box display={"flex"}>
                <ViewsCommentCountBlock singleQuestion={singleQuestion} />

                {/* <QuestionByIdViewsCommentCountBlock
                  singleQuestion={singleQuestion}
                  commentsSlice_commentsAll={commentsSlice_commentsAll}
                /> */}
                <OpenCommentFormFromUtils
                  setOpenCommentBox={setOpenCommentBox}
                  openCommentBox={openCommentBox}
                />

                {user?.id === singleQuestion?.User?.id && (
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
        message={messageQuestion}
      />
    </>
  )
}
export default QuestionById
