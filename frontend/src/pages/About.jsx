import { Container, Typography } from "@mui/material"

const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        textAlign="center"
        fontWeight={700}
        variant="h5"
        component="h1"
        marginY={2}
      >
        Full Stack Web Developer
      </Typography>
      <Typography>
        Skills:
        <br />✅ JavaScript
        <br />
        ✅ React
        <br />✅ Redux
        <br />✅ Node.js
        <br />✅ Express
        <br />✅ Sequelize
        <br />✅ Git
        <br />
        <br />
        If you want to know more about me: tinisto@gmail.com
      </Typography>
    </Container>
  )
}
export default About
