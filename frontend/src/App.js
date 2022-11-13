import { Home, Login, Registration } from "./pages"
import { Posts, PostEdit, PostAdd, PostById } from "./components/posts"
import { NewsAll, NewsById, NewsEdit, NewsAdd } from "./components/news"
import {
  QuestionAll,
  QuestionById,
  QuestionEdit,
  QuestionAdd,
} from "./components/questions"

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
          <Route path="/news/:id" element={<NewsById />} />
          <Route path="/news/edit/:id" element={<NewsEdit />} />
          <Route path="/news/add" element={<NewsAdd />} />
          <Route path="/questions" element={<QuestionAll />} />
          <Route path="/questions/:id" element={<QuestionById />} />
          <Route path="/questions/edit/:id" element={<QuestionEdit />} />
          <Route path="/questions/add" element={<QuestionAdd />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
