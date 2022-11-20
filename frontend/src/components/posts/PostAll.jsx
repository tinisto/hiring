import PostItem from "./PostItem"
import { useSelector, useDispatch } from "react-redux"
import { getArticlesByCategory } from "../../features/articles/articleSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import SnackbarFromUtils from "../../utils/SnackbarFromUtils"
import { v4 } from "uuid"

const PostAll = () => {
  const location = useLocation()
  const urlLink = location.pathname
  const { articles, message, isLoading } = useSelector(
    (state) => state.articleStore
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getArticlesByCategory(urlLink))
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
      {articles.length > 0 ? (
        <Box>
          <Typography
            textAlign="center"
            fontWeight={700}
            variant="h5"
            component="h1"
            marginY={2}
          >
            Posts
          </Typography>
          {articles.map((post) => (
            <PostItem
              key={v4()}
              post={post}
              user={user}
              id={post?.id}
              isLoading={isLoading}
            />
          ))}
        </Box>
      ) : (
        <>
          <Box>
            <Typography marginTop={3} textAlign={"center"} variant="h6">
              No posts yet
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
export default PostAll
