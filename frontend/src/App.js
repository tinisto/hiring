import Header from "./components/Header"
import { Home, Login, Registration } from "./pages"
import { Posts, PostEdit, PostAdd, PostById } from "./components/posts"
import TaskList from "./components/tasks/TaskList.jsx"
import { Routes, Route } from "react-router-dom"
import Profile from "./pages/Profile"
import About from "./pages/About"
const arrayLinks = ["posts", "tasks", "about"]

function App() {
  return (
    <>
      <Header links={arrayLinks} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostById />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/posts/add" element={<PostAdd />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </>
  )
}

export default App
