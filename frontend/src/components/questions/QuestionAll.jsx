import QuestionItem from "./QuestionItem"
import { useSelector, useDispatch } from "react-redux"
import { getArticlesByCategory } from "../../features/articles/articleSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import SnackbarFromUtils from "../../utils/SnackbarFromUtils"

const QuestionAll = () => {
  const location = useLocation()
  const urlLink = location.pathname.split("/")[1]
  const { articles, message, isLoading } = useSelector(
    (state) => state.articleStore
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getArticlesByCategory(urlLink))
    // dispatch(reset())
  }, [dispatch])

  // snackbar
  React.useEffect(() => {
    if (message) {
      setOpenSnackbar(true)
    }
    if (isLoading) {
      setOpenSnackbar(false)
    }
  }, [message, isLoading])
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }
  return (
    <Container maxWidth="lg">
      {articles.length ? (
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

          {articles.map((oneQuestion) => (
            <QuestionItem
              key={oneQuestion.id}
              oneQuestion={oneQuestion}
              user={user}
              message={message}
              id={oneQuestion.id}
              isLoading={isLoading}
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
export default QuestionAll
