import { Box, Container, Divider, Stack, Typography } from "@mui/material"

const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography textAlign="center" variant="h4" component="h1" marginY={2}>
        Hello!{" "}
        <Typography variant="span" color="primary">
          {" "}
          I'm Anatoly
        </Typography>
        .
        <br />
        I'm a full-stack web developer.
      </Typography>
      <Typography variant="h5">Skills:</Typography>
      <Typography variant="h6">
        ✅ JavaScript
        <br />
        ✅ React
        <br />✅ Redux
        <br />✅ Node
        <br />✅ Express
        <br />✅ Sequelize
        <br />✅ Git
      </Typography>
      <Typography variant="h5" marginY={2}>
        Any interests on collaborathing?
        <br />
        Just drop me a <a href="mailto:tinisto@gmail.com">line</a>!
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography>
          ‍Located
          <br />
          Minneapolis (CST)
        </Typography>
        <Typography>
          tinisto@gmail.com
          <br />+ 1 612 552 3950
        </Typography>
      </Stack>
    </Container>
  )
}
export default About
