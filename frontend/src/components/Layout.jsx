import { Outlet } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import RightBar from "./bars/RightBar"
import Navbar from "./bars/Navbar"
import { Stack } from "@mui/material"
import Feed from "./bars/Feed"
import { useSelector } from "react-redux"

const Layout = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={2}>
        <Sidebar user={user} />
        <Feed />

        <RightBar />
      </Stack>
    </>
  )
}
export default Layout
