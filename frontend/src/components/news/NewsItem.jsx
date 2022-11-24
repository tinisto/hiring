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
import parse from "html-react-parser"
import { v4 } from "uuid"

const NewsItem = ({ oneNews, user, id, isLoading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleDelete = async (id) => {
    const data = { id, linkSendToData: "news" }
    await dispatch(deleteArticle(data))
    navigate("/news", { state: "/news" })
  }

  const split_string = oneNews?.text?.split("<br>")
  let i = 1.2

  return (
    <>
      <Card
        sx={{
          width: "75%",
          height: "75%",
          margin: "auto",
          paddingX: 2,
          boxShadow: "5px 5px 10px #ccc",
          marginBottom: 3,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {location.pathname === "/" && (
          <Box sx={{ marginY: 2 }}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography variant="caption" component={Link} to="/news">
                News
              </Typography>
            )}
          </Box>
        )}
        <Box
          component={Link}
          to={`/news/${oneNews.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {oneNews.text && (
            <>
              {split_string.map((item) =>
                i > 0.4 ? (
                  <Box key={v4()} sx={{ opacity: (i = i - 0.2) }}>
                    {parse(item)}
                  </Box>
                ) : null
              )}
            </>
          )}
        </Box>
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
