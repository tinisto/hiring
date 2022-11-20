import { Avatar, Stack, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

const QuestionByIdMainContent = ({ singleArticle }) => {
  return (
    <>
      <Stack direction="row" spacing={2} marginY={1}>
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Typography variant="body2" color={"grey"}>
          Posted by {singleArticle?.User?.firstName}{" "}
          {singleArticle?.User?.lastName}
          <br />
          Published: {new Date(singleArticle?.createdAt).toLocaleString()}
        </Typography>
      </Stack>
      <Typography variant="h5" color="inherit" paragraph>
        {singleArticle?.text}
      </Typography>
    </>
  )
}
export default QuestionByIdMainContent
