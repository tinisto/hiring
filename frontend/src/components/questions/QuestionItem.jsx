import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { Edit, DeleteForever, ChatBubbleOutline } from "@mui/icons-material/"
import { useNavigate } from "react-router-dom"
import { deleteQuestion } from "../../features/questions/questionSlice"
import { useDispatch } from "react-redux"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const QuestionItem = ({ oneQuestion, user }) => {
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
            <Typography variant="caption" component={Link} to="/questions">
              Questions
            </Typography>
          </CardContent>
        )}
        <CardContent component={Link} to={`/questions/${oneQuestion.id}`}>
          <Typography variant="body2" color="text.secondary">
            {oneQuestion.text}
          </Typography>
        </CardContent>
        <CardActions>
          {oneQuestion?.Comments?.length > 0 && (
            <Box marginRight={"auto"}>
              <Tooltip title="Comments" arrow>
                <IconButton
                  onClick={() => navigate(`/questions/${oneQuestion?.id}`)}
                >
                  <ChatBubbleOutline />
                  <Typography ml={1} variant="body2">
                    {oneQuestion?.Comments?.length === 0 ? (
                      <></>
                    ) : oneQuestion?.Comments?.length === 1 ? (
                      `${oneQuestion?.Comments?.length} Comment`
                    ) : (
                      `${oneQuestion?.Comments?.length} Comments`
                    )}
                  </Typography>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {user?.id === oneQuestion?.User?.id && (
            <Box marginLeft={"auto"}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="warning"
                  onClick={() => navigate(`/questions/edit/${oneQuestion?.id}`)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteQuestion(oneQuestion.id))}
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
export default QuestionItem
