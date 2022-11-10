import React from "react"
import { Box, Button, Container, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { createTask } from "../../features/tasks/taskSlice.js"

// getTaskByID,
// editTask,

const TaskForm = () => {
  const dispatch = useDispatch()
  const {} = useSelector((state) => state.tasks)

  const [formData, setFormData] = React.useState({ name: "" })
  const { name } = formData

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTask(formData))
    setFormData({ name: "" })
  }
  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container>
      <Box
        component={"form"}
        onSubmit={onSubmit}
        maxWidth={500}
        display="flex"
        flexDirection={"column"}
        margin="auto"
        boxShadow="5px 5px 10px #ccc"
        padding={3}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <TextField
          label="Add Task"
          margin="normal"
          name="name"
          value={name}
          onChange={changeHandler}
          autoComplete="off"
          autoFocus
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Container>
  )
}
export default TaskForm
