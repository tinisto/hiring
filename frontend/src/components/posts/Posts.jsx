import PostItem from "./PostItem"
import { useSelector, useDispatch } from "react-redux"
import { getPosts, reset } from "../../features/posts/postSlice"
import React from "react"
import { Box, Button, Container, Fab, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"

const Diaries = () => {
  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <Container maxWidth="lg">
      {posts.length ? (
        <Box>
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
    </Container>
  )
}
export default Diaries
