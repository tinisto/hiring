import { Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  console.log("location.state", location.state)

  return (
    <>
      <Typography variant="h6">Search Results</Typography>
      <Typography variant="body2">Results for {location.state}</Typography>
    </>
  )
}
export default Search
