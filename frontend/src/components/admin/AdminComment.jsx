import {
  Breadcrumbs,
  InputAdornment,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector } from "react-redux"
import React from "react"
import { getAllComments } from "../../features/admin/adminSlice"
import { useDispatch } from "react-redux"
import AdminCommentItem from "./AdminCommentItem"
import SearchIcon from "@mui/icons-material/Search"

const AdminComment = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])
  const { commentsSlice_commentsAll } = useSelector((state) => state.admin)
  const [query, setQuery] = React.useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("query", query)
    dispatch(getAllComments(query))
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" marginTop={2}>
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>

        <Typography color="text.primary">Comments</Typography>
      </Breadcrumbs>
      <Typography variant="h5" textAlign={"center"} marginTop={2}>
        Comments
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search comments"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginY: 2 }}
        component={"form"}
        onSubmit={onSubmit}
        onChange={(e) => setQuery(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>User / Time</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commentsSlice_commentsAll
              .filter((comment) =>
                comment.commentText.toLowerCase().includes(query)
              )
              .map((item) => (
                <AdminCommentItem item={item} key={item.id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default AdminComment
