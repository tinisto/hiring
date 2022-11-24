import { Alert, Box, Button, Stack, Typography } from "@mui/material"
import React from "react"
import { createArticle, reset } from "../../features/articles/articleSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const QuestionAdd = () => {
  const location = useLocation()
  const urlLink = location.pathname.split("/")[1]
  const [alertState, setAlertState] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isError, message, isSuccess } = useSelector(
    (state) => state.articleStore
  )

  const onSubmit = (e) => {
    e.preventDefault()
    const result = value.replace(/(<p><br><\/p>)/g, "")
    const result1 = result.replace(/(<\/p><p>)/g, "<br>")
    const newFormData = { text: result1, urlLink }

    dispatch(createArticle(newFormData))
    if (isSuccess) {
      navigate("/questions", { state: "/questions" })
    }
  }

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isError) {
      setAlertState(true)
    }
  }, [user, navigate, isError, reset, dispatch, isSuccess])

  const [value, setValue] = React.useState("")

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      margin="auto"
      marginTop={3}
      alignItems="center"
    >
      <Typography
        variant="h5"
        marginBottom={2}
        textAlign="center"
        fontWeight={500}
      >
        Ask a Question
      </Typography>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Write something..."
      />
      {alertState ? (
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      ) : (
        <></>
      )}
      <Stack spacing={2} direction="row" justifyContent="center" marginTop={3}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          size="small"
          color="error"
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}
export default QuestionAdd
