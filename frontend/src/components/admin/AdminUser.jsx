import {
  Breadcrumbs,
  Button,
  Divider,
  InputAdornment,
  Link,
  Paper,
  Stack,
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
import { getAllUsers } from "../../features/admin/adminSlice"
import { useDispatch } from "react-redux"
import SearchIcon from "@mui/icons-material/Search"
import AdminUserItem from "./AdminUserItem"

const AdminUser = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  const { admin_AllUsers } = useSelector((state) => state.admin)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("onSubmit")
  }
  const [query, setQuery] = React.useState("")
  console.log("query", query)
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" marginTop={2}>
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>

        <Typography color="text.primary">Users</Typography>
      </Breadcrumbs>
      <Typography variant="h5" textAlign={"center"} marginTop={2}>
        Users
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search user"
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin_AllUsers
              .filter(
                (user) =>
                  user.firstName.toLowerCase().includes(query) ||
                  user.lastName.toLowerCase().includes(query) ||
                  user.email.toLowerCase().includes(query)
              )
              .map((item) => (
                <AdminUserItem item={item} key={item.id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default AdminUser
