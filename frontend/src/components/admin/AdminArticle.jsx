import { Breadcrumbs, Container, Link, Typography } from "@mui/material"

const AdminArticle = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" marginTop={2}>
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>

        <Typography color="text.primary">Articles</Typography>
      </Breadcrumbs>
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h3">Coming soon...</Typography>
      </Container>
    </>
  )
}
export default AdminArticle
