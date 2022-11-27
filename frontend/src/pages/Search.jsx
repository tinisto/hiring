import { Box, Container, Typography } from "@mui/material"
import { getSearch } from "../features/search/searchSlice"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import React from "react"
import PostItem from "../components/posts/PostItem"
import NewsItem from "../components/news/NewsItem"
import QuestionItem from "../components/questions/QuestionItem"

const Search = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { articles } = useSelector((state) => state.search)
  const { user } = useSelector((state) => state.auth)

  React.useEffect(() => {
    dispatch(getSearch(location.state))
  }, [location.state, dispatch])

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
    <>
      <Container maxWidth="lg">
        <Box sx={{ marginY: 2, textAlign: "center" }}>
          <Typography variant="h6">Search Results</Typography>
          <Typography variant="body2">
            Results for "{location.state}"
          </Typography>
        </Box>

        {articles?.length ? (
          <Box>{articles.map((item) => switchByCategoryId(item))}</Box>
        ) : (
          <>
            <Box>
              <Typography marginTop={3} textAlign={"center"} variant="h6">
                Hm... we couldn’t find any results for "{location.state}"
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}
export default Search
