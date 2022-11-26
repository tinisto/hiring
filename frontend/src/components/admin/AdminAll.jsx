import { Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

const AdminAll = () => {
  const navigate = useNavigate()
  const { message, isError, isSuccess, user } = useSelector(
    (state) => state.auth
  )
  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography textAlign={"center"} variant="h4" marginY={3}>
        Everyone can see this page for now.
      </Typography>
      <Stack direction="row" justifyContent={"space-around"}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/admin/comments")}
          color="secondary"
        >
          Comments
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/admin/articles")}
        >
          Articles
        </Button>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => navigate("/admin/users")}
        >
          Users
        </Button>
      </Stack>
    </Container>
  )
}
export default AdminAll
