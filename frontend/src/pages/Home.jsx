import { Box, Typography, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import Fileupload from "../components/Fileupload"

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box position={"relative"} width="100%" height={"90vh"}>
      <Typography
        sx={{ position: "absolute" }}
        fontFamily="Dancing Script"
        variant="h3"
        textAlign={"center"}
        width="100%"
        marginTop={5}
        color="#111115de"
      >
        Dare to live your life you've always wanted
      </Typography>
      <img src="/road.jpg" alt="Road" width={"100%"} height={"70%"} />
      <Box>
        <Typography
          padding={3}
          variant="h6"
          textTransform={"uppercase"}
          textAlign="center"
          fontFamily={"quicksand"}
        >
          Share your posts
        </Typography>
        <Box display={"flex"} justifyContent="center" gap={3}>
          <Button variant="outlined" component={Link} to="/posts/add">
            share your story
          </Button>
          <Button variant="contained" component={Link} to="/posts">
            view posts
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default Home
