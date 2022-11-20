import NewsItem from "./NewsItem"
import { useSelector, useDispatch } from "react-redux"
import { getArticlesByCategory } from "../../features/articles/articleSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import SnackbarFromUtils from "../../utils/SnackbarFromUtils"
import { useLocation } from "react-router-dom"
import { v4 } from "uuid"

const NewsAll = () => {
  const location = useLocation()
  const urlLink = location.pathname.split("/")[1]
  const { articles, message, isLoading } = useSelector(
    (state) => state.articleStore
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getArticlesByCategory(urlLink))
  }, [dispatch])

  // snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }
  React.useEffect(() => {
    if (message) {
      setOpenSnackbar(true)
    }
    if (isLoading) {
      setOpenSnackbar(false)
    }
  }, [message, isLoading])

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
            News
          </Typography>

          {articles.map((oneNews) => (
            <NewsItem
              key={v4()}
              oneNews={oneNews}
              user={user}
              message={message}
              id={oneNews?.id}
              isLoading={isLoading}
            />
          ))}
        </Box>
      ) : (
        <>
          <Box>
            <Typography marginTop={3} textAlign={"center"} variant="h6">
              No news yet
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
export default NewsAll
