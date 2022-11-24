import { Box, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { reset } from "../features/articles/articleSlice"
import React from "react"

const NotFoundPage = () => {
  const dispatch = useDispatch()
  // React.useEffect(() => {
  //   dispatch(reset())
  // }, [dispatch])

  return (
    <Box textAlign="center" marginTop={5}>
      <Typography variant="h3">Uh-oh!</Typography>
      <Typography variant="h5" marginTop={3}>
        It could be you, or it could be us, but there's no page here.
      </Typography>
    </Box>
  )
}
export default NotFoundPage
