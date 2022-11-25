import { Home, Login, Registration } from "./pages"
import { PostAll, PostEdit, PostAdd, PostById } from "./components/posts"
import { NewsAll, NewsById, NewsEdit, NewsAdd } from "./components/news"
import {
  AdminAll,
  AdminComment,
  AdminArticle,
  AdminUser,
} from "./components/admin"
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
import NotFoundPage from "./pages/NotFoundPage"
import Search from "./pages/Search"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<PostAll />} />
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
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminAll />} />
          <Route path="/admin/comments" element={<AdminComment />} />
          <Route path="/admin/users" element={<AdminUser />} />
          <Route path="/admin/articles" element={<AdminArticle />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
