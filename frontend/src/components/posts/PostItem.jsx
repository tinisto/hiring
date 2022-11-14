import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { Edit, DeleteForever, ChatBubbleOutline } from "@mui/icons-material/"
import { useNavigate } from "react-router-dom"
import { deletePost } from "../../features/posts/postSlice"
import { useDispatch } from "react-redux"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const PostItem = ({ post, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

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
            <Typography variant="caption" component={Link} to="/posts">
              Posts
            </Typography>
          </CardContent>
        )}

        <CardMedia
          component="img"
          height="194"
          image="https://images.unsplash.com/photo-1666556117061-8bc9fe639abc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Paella dish"
          onClick={() => navigate(`/posts/${post?.id}`)}
          sx={{ cursor: "pointer" }}
        />

        <CardContent component={Link} to={`/posts/${post.id}`}>
          <Typography variant="h6" color="text.secondary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions>
          {post?.Comments?.length > 0 && (
            <Box marginRight={"auto"}>
              <Tooltip title="Comments" arrow>
                <IconButton onClick={() => navigate(`/posts/${post?.id}`)}>
                  <ChatBubbleOutline />
                  <Typography ml={1} variant="body2">
                    {post?.Comments?.length === 0 ? (
                      <></>
                    ) : post?.Comments?.length === 1 ? (
                      `${post?.Comments?.length} Comment`
                    ) : (
                      `${post?.Comments?.length} Comments`
                    )}
                  </Typography>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {user?.id === post?.User?.id && (
            <Box marginLeft={"auto"}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="warning"
                  onClick={() => navigate(`/posts/edit/${post?.id}`)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </CardActions>
      </Card>
    </>
  )
}
export default PostItem
