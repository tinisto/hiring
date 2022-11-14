import { Box, IconButton, Tooltip } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Edit, DeleteForever } from "@mui/icons-material/"
import { useLocation } from "react-router-dom"

const UserTheSameDeleteEditBlockFromUtils = ({ handleDelete, id }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const shortCutURL = location.pathname.split("/")[1]

  return (
    <Box marginLeft={"auto"}>
      <Tooltip title="Edit" arrow>
        <IconButton
          color="warning"
          onClick={() => navigate(`/${shortCutURL}/edit/${id}`)}
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
export default UserTheSameDeleteEditBlockFromUtils
