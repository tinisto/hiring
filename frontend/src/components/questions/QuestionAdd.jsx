import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import { createQuestion, reset } from "../../features/questions/questionSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const QuestionAdd = () => {
  const [alertState, setAlertState] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isErrorQuestion, messageQuestion, isSuccessQuestion } = useSelector(
    (state) => state.questions
  )

  const [formData, setFormdata] = React.useState({
    text: "",
  })
  const { text } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createQuestion(formData))

    if (isSuccessQuestion) {
      navigate("/questions")
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formData, [name]: value })
  }
  React.useEffect(() => {
    // dispatch(reset())
    if (!user) {
      navigate("/login")
    }
    if (isErrorQuestion) {
      setAlertState(true)
    }
  }, [user, navigate, isErrorQuestion, reset, dispatch])

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection={"column"}
      width="75%"
      margin="auto"
      marginTop={3}
      alignItems="center"
    >
      <Typography variant="h5">Ask a question</Typography>

      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Text"
        type="text"
        name="text"
        value={text}
        onChange={onChange}
        multiline
      />
      {alertState ? (
        <Alert variant="filled" severity="error">
          {messageQuestion}
        </Alert>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        type="submit"
        color="warning"
        sx={{ marginTop: 3, borderRadius: 3 }}
      >
        Submit
      </Button>
    </Box>
  )
}
export default QuestionAdd
