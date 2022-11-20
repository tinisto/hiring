import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteArticle } from "../../features/articles/articleSlice.js"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import UserTheSameDeleteEditBlockFromUtils from "../../utils/UserTheSameDeleteEditBlockFromUtils"
import ItemOpenCommentFormFromUtils from "../../utils/forItems/ItemOpenCommentFormFromUtils.jsx"
import ItemCommentCountBlockFromUtils from "../../utils/forItems/ItemCommentCountBlockFromUtils.jsx"
import ViewCountBlockFromUtils from "../../utils/ViewCountBlockFromUtils"

const QuestionItem = ({ oneQuestion, user, id, isLoading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleDelete = async (id) => {
    const data = { id, linkSendToData: "questions" }
    await dispatch(deleteArticle(data))
    navigate("/questions", { state: "/questions" })
  }

  return (
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
            <Typography variant="caption" component={Link} to="/questions">
              Questions
            </Typography>
          )}
        </CardContent>
      )}
      <CardContent component={Link} to={`/questions/${oneQuestion.id}`}>
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <Typography variant="h6" color="text.secondary">
            {oneQuestion.text}
          </Typography>
        )}
      </CardContent>
      {isLoading ? (
        <Skeleton width="60%" />
      ) : (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <ViewCountBlockFromUtils singleArticle={oneQuestion} />

          {oneQuestion?.Comments?.length === 0 ? (
            <ItemOpenCommentFormFromUtils
              link="questions"
              singleArticle={oneQuestion}
            />
          ) : (
            <ItemCommentCountBlockFromUtils
              link="questions"
              singleArticle={oneQuestion}
            />
          )}

          {user?.id === oneQuestion?.User?.id && (
            <UserTheSameDeleteEditBlockFromUtils
              handleDelete={handleDelete}
              link="questions"
              id={oneQuestion?.id}
            />
          )}
        </CardActions>
      )}
    </Card>
  )
}
export default QuestionItem
