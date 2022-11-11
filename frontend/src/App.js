import { Home, Login, Registration } from "./pages"
import { Posts, PostEdit, PostAdd, PostById } from "./components/posts"
import { NewsAll } from "./components/news"
import { QuestionsAll } from "./components/questions"

import TaskList from "./components/tasks/TaskList.jsx"
import { Routes, Route } from "react-router-dom"
import Profile from "./pages/Profile"
import About from "./pages/About"
import Layout from "./components/Layout"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="index" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostById />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/posts/add" element={<PostAdd />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/news" element={<NewsAll />} />
          <Route path="/questions" element={<QuestionsAll />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
