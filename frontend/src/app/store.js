import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import commentReducer from "../features/comments/commentSlice"
import taskReducer from "../features/tasks/taskSlice"
import articleReducer from "../features/articles/articleSlice"
import adminReducer from "../features/admin/adminSlice"
import searchReducer from "../features/search/searchSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articleStore: articleReducer,
    comments: commentReducer,
    tasks: taskReducer,
    admin: adminReducer,
    search: searchReducer,
  },
})
