import { Avatar, Stack, Typography } from "@mui/material"

const NewsByIdMainContent = ({ singleNews }) => {
  return (
    <>
      <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
        {singleNews?.User?.id}
      </Avatar>
      <Typography variant="body2" color={"grey"}>
        By {singleNews?.User?.firstName} {singleNews?.User?.lastName}
        <br />
        Published: {new Date(singleNews?.createdAt).toLocaleString()}
      </Typography>
      <Typography component="h1" variant="h3">
        {singleNews?.titleNews}
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        {singleNews?.textNews}
      </Typography>
    </>
  )
}
export default NewsByIdMainContent
