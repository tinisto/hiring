import {
  Box,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { deleteArticle } from "../../features/articles/articleSlice.js"
import { useDispatch } from "react-redux"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import UserTheSameDeleteEditBlockFromUtils from "../../utils/UserTheSameDeleteEditBlockFromUtils.jsx"
import ItemCommentCountBlockFromUtils from "../../utils/forItems/ItemCommentCountBlockFromUtils.jsx"
import ItemOpenCommentFormFromUtils from "../../utils/forItems/ItemOpenCommentFormFromUtils.jsx"
import ViewCountBlockFromUtils from "../../utils/ViewCountBlockFromUtils"

const NewsItem = ({ oneNews, user, id, isLoading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleDelete = async (id) => {
    const data = { id, linkSendToData: "news" }
    await dispatch(deleteArticle(data))
    navigate("/news", { state: "/news" })
  }

  return (
    <>
      <Card
        sx={{
          width: "75%",
          height: "75%",
          margin: "auto",
          padding: 1,
          boxShadow: "5px 5px 10px #ccc",
          marginBottom: 3,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {location.pathname === "/" && (
          <CardContent>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography variant="caption" component={Link} to="/news">
                News
              </Typography>
            )}
          </CardContent>
        )}
        <CardContent
          component={Link}
          to={`/news/${oneNews.id}`}
          style={{ textDecoration: "none" }}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <Typography variant="h6" color="text.secondary">
              {oneNews.title}
            </Typography>
          )}
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <Typography
              style={{ whiteSpace: "pre-wrap" }}
              variant="body2"
              color="text.secondary"
            >
              <Box component="span" sx={{ opacity: 1 }} display="inline">
                {oneNews?.text?.slice(0, 100)}
              </Box>
              <Box component="span" sx={{ opacity: 0.8 }} display="inline">
                {oneNews?.text?.slice(100, 200)}
              </Box>
              <Box component="span" sx={{ opacity: 0.6 }} display="inline">
                {oneNews?.text?.slice(200, 300)}
              </Box>
              <Box component="span" sx={{ opacity: 0.4 }} display="inline">
                {oneNews?.text?.slice(300, 400)}
              </Box>
              <Box component="span" sx={{ opacity: 0.2 }} display="inline">
                {oneNews?.text?.slice(400, 500)}
              </Box>
            </Typography>
          )}
        </CardContent>
        {isLoading ? (
          <Skeleton width="60%" />
        ) : (
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ViewCountBlockFromUtils singleArticle={oneNews} />
            {oneNews?.Comments?.length === 0 ? (
              <ItemOpenCommentFormFromUtils
                link="news"
                singleArticle={oneNews}
              />
            ) : (
              <ItemCommentCountBlockFromUtils
                link="news"
                singleArticle={oneNews}
              />
            )}

            {user?.id === oneNews?.User?.id && (
              <UserTheSameDeleteEditBlockFromUtils
                handleDelete={handleDelete}
                link="news"
                id={oneNews?.id}
              />
            )}
          </CardActions>
        )}
      </Card>
    </>
  )
}
export default NewsItem
