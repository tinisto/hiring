import { Button, Stack, TableCell, TableRow } from "@mui/material"
import React from "react"

const AdminUserItem = ({ item }) => {
  return (
    <TableRow key={item?.id}>
      <TableCell component="th" scope="row">
        {item?.id}
      </TableCell>

      <TableCell component="th" scope="row">
        {item?.firstName} {item?.lastName}
      </TableCell>
      <TableCell component="th" scope="row">
        {item?.email}
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack direction="row" spacing={2} justifyContent="space-evenly">
          <Button variant="contained" size="small" disabled>
            Block
          </Button>
          <Button variant="contained" color="error" size="small" disabled>
            Suspend
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
export default AdminUserItem
