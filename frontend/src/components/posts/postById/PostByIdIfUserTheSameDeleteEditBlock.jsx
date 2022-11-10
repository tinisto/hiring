import { Box, IconButton, Tooltip } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Edit, DeleteForever } from "@mui/icons-material/"

const PostByIdIfUserTheSameDeleteEditBlock = ({ handleDelete, id }) => {
  const navigate = useNavigate()

  return (
    <Box marginLeft={"auto"}>
      <Tooltip title="Edit" arrow>
        <IconButton
          color="warning"
          onClick={() => navigate(`/posts/edit/${id}`)}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <IconButton color="error" onClick={() => handleDelete(id)}>
          <DeleteForever />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
export default PostByIdIfUserTheSameDeleteEditBlock
