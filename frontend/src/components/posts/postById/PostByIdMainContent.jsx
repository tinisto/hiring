import { Typography } from "@mui/material"

const PostByIdMainContent = ({ singlePost }) => {
  return (
    <>
      <Typography variant="body2" color={"grey"}>
        By {singlePost?.User?.firstName} {singlePost?.User?.lastName}
        <br />
        Published: {new Date(singlePost?.createdAt).toLocaleString()}
      </Typography>
      <Typography component="h1" variant="h3">
        {singlePost?.title}
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        {singlePost?.text}
      </Typography>
    </>
  )
}
export default PostByIdMainContent
