import { Avatar, Stack, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

const NewsByIdMainContent = ({ singleArticle }) => {
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
      <Typography component="h1" variant="h3">
        {singleArticle?.title}
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        {singleArticle?.text}
      </Typography>
    </>
  )
}
export default NewsByIdMainContent
