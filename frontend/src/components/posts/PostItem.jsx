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
import ItemOpenCommentFormFromUtils from "../../utils/forItems/ItemOpenCommentFormFromUtils.jsx"
import ItemCommentCountBlockFromUtils from "../../utils/forItems/ItemCommentCountBlockFromUtils.jsx"
import ViewCountBlockFromUtils from "../../utils/ViewCountBlockFromUtils"

const PostItem = ({ post, user, id, isLoading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleDelete = async (id) => {
    const data = { id, linkSendToData: "posts" }
    await dispatch(deleteArticle(data))
    navigate("/posts", { state: "/posts" })
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
              <Typography variant="caption" component={Link} to="/posts">
                Posts
              </Typography>
            )}
          </CardContent>
        )}
        <CardContent
          component={Link}
          to={`/posts/${post.id}`}
          style={{ textDecoration: "none" }}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <Typography variant="h6" color="text.secondary">
              {post.title}
            </Typography>
          )}
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <Typography
                style={{ whiteSpace: "pre-wrap" }}
                variant="body2"
                color="text.secondary"
              >
                <Box component="span" sx={{ opacity: 1 }} display="inline">
                  {post?.text?.slice(0, 100)}
                </Box>
                <Box component="span" sx={{ opacity: 0.8 }} display="inline">
                  {post?.text?.slice(100, 200)}
                </Box>
                <Box component="span" sx={{ opacity: 0.6 }} display="inline">
                  {post?.text?.slice(200, 300)}
                </Box>
                <Box component="span" sx={{ opacity: 0.4 }} display="inline">
                  {post?.text?.slice(300, 400)}
                </Box>
                <Box component="span" sx={{ opacity: 0.2 }} display="inline">
                  {post?.text?.slice(400, 500)}
                </Box>
              </Typography>
            </>
          )}
        </CardContent>
        {isLoading ? (
          <Skeleton width="60%" />
        ) : (
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ViewCountBlockFromUtils singleArticle={post} />
            {post?.Comments?.length === 0 ? (
              <ItemOpenCommentFormFromUtils link="posts" singleArticle={post} />
            ) : (
              <ItemCommentCountBlockFromUtils
                link="posts"
                singleArticle={post}
              />
            )}

            {user?.id === post?.User?.id && (
              <UserTheSameDeleteEditBlockFromUtils
                handleDelete={handleDelete}
                link="posts"
                id={post?.id}
              />
            )}
          </CardActions>
        )}
      </Card>
    </>
  )
}
export default PostItem
