import PostItem from "./PostItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../../features/posts/postSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import SnackbarFromUtils from "../../utils/SnackbarFromUtils"

const PostAll = () => {
  const location = useLocation()
  const { posts, message } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllPosts({ urlLink: location.pathname }))
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
      {posts.length ? (
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
          {posts.map((post) => (
            <PostItem key={post.id} post={post} user={user} />
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
      <SnackbarFromUtils
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
    </Container>
  )
}
export default PostAll
