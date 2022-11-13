import { Outlet } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import RightBar from "./bars/RightBar"
import Navbar from "./bars/Navbar"
import { Stack } from "@mui/material"
import Feed from "./bars/Feed"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

const Layout = () => {
  const location = useLocation()

  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={2}>
        <Sidebar user={user} />
        <Feed />

        <RightBar pathname={location.pathname} />
      </Stack>
    </>
  )
}
export default Layout
