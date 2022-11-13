import { Avatar, Typography } from "@mui/material"

const QuestionByIdMainContent = ({ singleQuestion }) => {
  return (
    <>
      <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
        {singleQuestion?.User?.id}
      </Avatar>
      <Typography variant="body2" color={"grey"}>
        By {singleQuestion?.User?.firstName} {singleQuestion?.User?.lastName}
        <br />
        Published: {new Date(singleQuestion?.createdAt).toLocaleString()}
      </Typography>

      <Typography variant="h5" color="inherit" paragraph>
        {singleQuestion?.textQuestion}
      </Typography>
    </>
  )
}
export default QuestionByIdMainContent
