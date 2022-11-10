import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { deleteTask, editTask, reset } from "../../features/tasks/taskSlice.js"
import { useDispatch, useSelector } from "react-redux"
import React from "react"

const Task = ({ task }) => {
  const effectRan = React.useRef(false)
  const dispatch = useDispatch()
  const { message, isSuccess, isLoading } = useSelector((state) => state.tasks)

  const [open, setOpen] = React.useState(false)
  const [openTextField, setOpenTextField] = React.useState(false)
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
    completed: false,
  })
  const { id, name, completed } = formData
  const [checked, setChecked] = React.useState(completed)

  React.useEffect(() => {
    setFormData(task)
    if (message) {
      setOpen(true)
    }
    dispatch(reset())
  }, [message])

  const handleClose = () => {
    setOpen(false)
  }
  const handleEdit = (id) => {
    setOpenTextField(true)
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setOpenTextField(false)
    dispatch(editTask({ id, name, completed }))
  }

  const handleChange = (event) => {
    setChecked(!checked)
    setFormData({ ...formData, completed: event.target.checked })
    dispatch(editTask({ id, name, completed: event.target.checked }))
  }

  return (
    <>
      <Box display={"flex"} margin="auto" maxWidth={450} alignItems="center">
        <List>
          <Box component={"form"} onSubmit={onSubmit}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox checked={completed} onChange={handleChange} />
                </ListItemIcon>

                {isLoading ? <CircularProgress /> : <></>}

                {openTextField ? (
                  <TextField name="name" value={name} onChange={onChange} />
                ) : completed ? (
                  <ListItemText sx={{ textDecorationLine: "line-through" }}>
                    {name}
                  </ListItemText>
                ) : (
                  <ListItemText>{name}</ListItemText>
                )}
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
        <Box marginLeft={"auto"}>
          <IconButton>
            <Tooltip title="Edit" arrow>
              <EditIcon color="success" onClick={() => handleEdit(task.id)} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Delete" arrow>
              <DeleteIcon
                onClick={() => dispatch(deleteTask(task.id))}
                color="error"
              />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
      {open ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  )
}
export default Task
