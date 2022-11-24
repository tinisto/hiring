import { Avatar, Stack, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import parse from "html-react-parser"

const PostByIdMainContent = ({ singleArticle }) => {
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
      {singleArticle?.text && parse(singleArticle?.text)}
    </>
  )
}
export default PostByIdMainContent
