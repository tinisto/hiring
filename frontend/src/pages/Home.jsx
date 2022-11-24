import PostItem from "../components/posts/PostItem"
import NewsItem from "../components/news/NewsItem"
import QuestionItem from "../components/questions/QuestionItem"
import { useSelector, useDispatch } from "react-redux"
import { getAllArticle } from "../features/articles/articleSlice"
import React from "react"
import { Box, Container, Typography } from "@mui/material"

const Home = () => {
  const { articles } = useSelector((state) => state.articleStore)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllArticle())
  }, [dispatch])

  const switchByCategoryId = (item) => {
    switch (item.CategoryId) {
      case 1:
        return <PostItem key={item.id} post={item} user={user} />
      case 2:
        return <NewsItem key={item.id} oneNews={item} user={user} />
      case 3:
        return <QuestionItem key={item.id} oneQuestion={item} user={user} />
      default:
        return null
    }
  }
  return (
    <Container maxWidth="lg">
      {articles?.length ? (
        <Box>{articles.map((item) => switchByCategoryId(item))}</Box>
      ) : (
        <>
          <Box>
            <Typography marginTop={3} textAlign={"center"} variant="h6">
              No Articles yet
            </Typography>
          </Box>
        </>
      )}
    </Container>
  )
}
export default Home
