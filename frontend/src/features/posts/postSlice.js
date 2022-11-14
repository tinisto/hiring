import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from "./postService"

const initialState = {
  posts: [],
  singlePost: [],
  tags: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// createPost,
// getAllPosts,
// getOnePostById,
// editPost,
// deletePost,

// createPost _____________________________________________________________________________________
export const createPost = createAsyncThunk(
  "createPost",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(formData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// getAllPosts _____________________________________________________________________________________
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPosts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// getOnePostById _____________________________________________________________________________________
export const getOnePostById = createAsyncThunk(
  "posts/getOnePostById",
  async (id, thunkAPI) => {
    try {
      return await postService.getOnePostById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// editPost _____________________________________________________________________________________
export const editPost = createAsyncThunk(
  "editPost",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.editPost(formData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// deletePost _____________________________________________________________________________________
export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // createPost _____________________________________________________________________________________
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.unshift(action.payload.result)
        state.message = action.payload.message
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.posts = []
      })

      // getAllPosts _____________________________________________________________________________________
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.posts = []
      })

      // getOnePostById _____________________________________________________________________________________
      .addCase(getOnePostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOnePostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singlePost = action.payload
      })
      .addCase(getOnePostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.singlePost = []
      })

      // editPost _____________________________________________________________________________________
      .addCase(editPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singlePost = action.payload.result
        state.message = action.payload.message
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.singlePost = []
      })

      // deletePost _____________________________________________________________________________________
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
        state.message = ""
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter(
          (item) => item.id !== +action.payload.id
        )
        state.singlePost = []
        state.message = action.payload.message
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.posts = []
      })
  },
})

export const { reset } = postSlice.actions

export default postSlice.reducer
