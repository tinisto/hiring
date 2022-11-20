import { Box, IconButton, Tooltip } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Edit, DeleteForever } from "@mui/icons-material/"

const UserTheSameDeleteEditBlockFromUtils = ({ handleDelete, id, link }) => {
  const navigate = useNavigate()
  const switchByLink = () => {
    switch (link) {
      case "posts":
        return (
          <Tooltip title="Edit" arrow>
            <IconButton
              color="warning"
              onClick={() => navigate(`/posts/edit/${id}`)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )
      case "news":
        return (
          <Tooltip title="Edit" arrow>
            <IconButton
              color="warning"
              onClick={() => navigate(`/news/edit/${id}`)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )
      case "questions":
        return (
          <Tooltip title="Edit" arrow>
            <IconButton
              color="warning"
              onClick={() => navigate(`/questions/edit/${id}`)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )

      default:
        return null
    }
  }

  return (
    <Box>
      {switchByLink()}
      <Tooltip title="Delete" arrow>
        <IconButton color="error" onClick={() => handleDelete(id)}>
          <DeleteForever />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
export default UserTheSameDeleteEditBlockFromUtils
