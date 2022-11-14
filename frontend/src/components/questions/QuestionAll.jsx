import QuestionItem from "./QuestionItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllQuestion } from "../../features/questions/questionSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import QuestionSnackbar from "./QuestionSnackbar"

const QuestionAll = () => {
  const { allQuestions, messageQuestion } = useSelector(
    (state) => state.questions
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllQuestion())
  }, [dispatch])
  React.useEffect(() => {
    if (messageQuestion) {
      setOpenSnackbar(true)
    }
  }, [messageQuestion])
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }
  return (
    <Container maxWidth="lg">
      {allQuestions.length ? (
        <Box>
          <Typography
            textAlign="center"
            fontWeight={700}
            variant="h5"
            component="h1"
            marginY={2}
          >
            Questions
          </Typography>
          {allQuestions.map((oneQuestion) => (
            <QuestionItem
              key={oneQuestion.id}
              oneQuestion={oneQuestion}
              user={user}
              messageQuestion={messageQuestion}
            />
          ))}
        </Box>
      ) : (
        <>
          <Box>
            <Typography marginTop={3} textAlign={"center"} variant="h6">
              No questions yet
            </Typography>
          </Box>
        </>
      )}
      <QuestionSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        messageQuestion={messageQuestion}
      />
    </Container>
  )
}
export default QuestionAll
