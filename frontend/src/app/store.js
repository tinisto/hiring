import { configureStore } from "@reduxjs/toolkit"
import postReducer from "../features/posts/postSlice"
import authReducer from "../features/auth/authSlice"
import commentReducer from "../features/comments/commentSlice"
import taskReducer from "../features/tasks/taskSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer,
    tasks: taskReducer,
  },
})
