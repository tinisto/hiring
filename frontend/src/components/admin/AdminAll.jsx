import { Button, Container, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React from "react"

const AdminAll = () => {
  const navigate = useNavigate()
  return (
    <Container sx={{ marginTop: 5 }}>
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
