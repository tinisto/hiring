import TaskForm from "./TaskForm"
import Task from "./Task"
import { getAllTasks } from "../../features/tasks/taskSlice.js"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { Container, Typography } from "@mui/material"

const TaskList = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)
  React.useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <Typography
        textAlign="center"
        fontWeight={700}
        variant="h5"
        component="h1"
        marginY={2}
      >
        Task Management
      </Typography>
      <TaskForm />
      {tasks.length ? (
        <>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </>
      ) : (
        <Typography variant="h6" textAlign={"center"}>
          No tasks yet
        </Typography>
      )}
    </Container>
  )
}
export default TaskList
