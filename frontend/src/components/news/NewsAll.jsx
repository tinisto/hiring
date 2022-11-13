import NewsItem from "./NewsItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllNews } from "../../features/news/newsSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"

const NewsAll = () => {
  const { allNews } = useSelector((state) => state.news)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllNews())
  }, [dispatch])
  return (
    <Container maxWidth="lg">
      {allNews.length ? (
        <Box>
          {allNews.map((oneNews) => (
            <NewsItem key={oneNews.id} oneNews={oneNews} user={user} />
          ))}
        </Box>
      ) : (
        <>
          <Box>
            <Typography marginTop={3} textAlign={"center"} variant="h6">
              No News yet
            </Typography>
          </Box>
        </>
      )}
    </Container>
  )
}
export default NewsAll