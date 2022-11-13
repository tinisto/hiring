import QuestionItem from "./QuestionItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllQuestion } from "../../features/questions/questionSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"

const QuestionAll = () => {
  const { allQuestions } = useSelector((state) => state.questions)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllQuestion())
  }, [dispatch])
  return (
    <Container maxWidth="lg">
      {allQuestions.length ? (
        <Box>
          {allQuestions.map((oneQuestion) => (
            <QuestionItem
              key={oneQuestion.id}
              oneQuestion={oneQuestion}
              user={user}
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
    </Container>
  )
}
export default QuestionAll
