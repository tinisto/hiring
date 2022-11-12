import { Box, Button, IconButton } from "@mui/material"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import React from "react"
import axios from "axios"

const Fileupload = () => {
  const [file, setFile] = React.useState(null)
  const onInputChange = (e) => {
    setFile(e.target.files[0])
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    await axios.post("/upload", data)
  }
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Button variant="contained" component="label">
        Upload your image
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onInputChange}
        />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={onInputChange} />
        <PhotoCamera />
      </IconButton>
      {/* <Button type="submit">Submit</Button> */}
    </Box>
  )
}
export default Fileupload
