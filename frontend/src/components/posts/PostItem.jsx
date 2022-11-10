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
import {
  Edit,
  DeleteForever,
  Visibility,
  ChatBubbleOutline,
} from "@mui/icons-material/"
import { useNavigate } from "react-router-dom"
import { deletePost } from "../../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { Link } from "react-router-dom"

const PostItem = ({ post, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post.id}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title={`By ${post?.User?.firstName} ${post?.User?.lastName}`}
          subheader={new Date(post.createdAt).toLocaleDateString("en-US")}
        />
        <CardMedia
          component="img"
          height="194"
          image="https://images.unsplash.com/photo-1666556117061-8bc9fe639abc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Paella dish"
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
          <Box marginRight={"auto"}>
            <Tooltip title="Views" arrow>
              <IconButton>
                <Visibility />
                <Typography ml={1} variant="body2">
                  {post.viewsCount}
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Comments" arrow>
              <IconButton>
                <ChatBubbleOutline />
                <Typography ml={1} variant="body2">
                  {post?.Comments?.length}
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>
          {user?.id === post?.User?.id ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </>
  )
}
export default PostItem