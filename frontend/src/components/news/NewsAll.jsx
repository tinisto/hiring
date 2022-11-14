import NewsItem from "./NewsItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllNews } from "../../features/news/newsSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import SnackbarFromUtils from "../../utils/SnackbarFromUtils"

const NewsAll = () => {
  const { allNews, message } = useSelector((state) => state.news)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllNews())
  }, [dispatch])

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
    <Container maxWidth="lg">
      {allNews.length ? (
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

          {allNews.map((oneNews) => (
            <NewsItem key={oneNews.id} oneNews={oneNews} user={user} />
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
      <SnackbarFromUtils
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
    </Container>
  )
}
export default NewsAll
