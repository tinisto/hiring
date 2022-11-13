import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { Edit, DeleteForever, ChatBubbleOutline } from "@mui/icons-material/"
import { useNavigate } from "react-router-dom"
import { deleteNews } from "../../features/news/newsSlice"
import { useDispatch } from "react-redux"
import React from "react"
import { Link } from "react-router-dom"

const NewsItem = ({ oneNews, user }) => {
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
        <CardContent component={Link} to={`/news/${oneNews.id}`}>
          <Typography variant="h6" color="text.secondary">
            {oneNews.titleNews}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {oneNews.textNews}
          </Typography>
        </CardContent>
        <CardActions>
          {oneNews?.Comments?.length > 0 && (
            <Box marginRight={"auto"}>
              <Tooltip title="Comments" arrow>
                <IconButton onClick={() => navigate(`/news/${oneNews?.id}`)}>
                  <ChatBubbleOutline />
                  <Typography ml={1} variant="body2">
                    {oneNews?.Comments?.length === 0 ? (
                      <></>
                    ) : oneNews?.Comments?.length === 1 ? (
                      `${oneNews?.Comments?.length} Comment`
                    ) : (
                      `${oneNews?.Comments?.length} Comments`
                    )}
                  </Typography>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {user?.id === oneNews?.User?.id && (
            <Box marginLeft={"auto"}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="warning"
                  onClick={() => navigate(`/news/edit/${oneNews?.id}`)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteNews(oneNews.id))}
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
export default NewsItem
