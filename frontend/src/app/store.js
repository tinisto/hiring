import { configureStore } from "@reduxjs/toolkit"
import postReducer from "../features/posts/postSlice"
import authReducer from "../features/auth/authSlice"
import commentReducer from "../features/comments/commentSlice"
import taskReducer from "../features/tasks/taskSlice"
import newsReducer from "../features/news/newsSlice"
import questionReducer from "../features/questions/questionSlice"
import articleReducer from "../features/articles/articleSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articleStore: articleReducer,
    comments: commentReducer,
    tasks: taskReducer,
    // posts: postReducer,
    // news: newsReducer,
    // questions: questionReducer,
  },
})
