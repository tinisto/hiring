import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import commentService from "./commentService"

const initialState = {
  commentsSlice_isError: [],
  commentsSlice_isSuccess: false,
  commentsSlice_isLoading: false,
  commentsSlice_message: "",
  commentsSlice_commentSingle: [],
  commentsSlice_commentsAll: [],
}

// createComment
export const createComment = createAsyncThunk(
  "createComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.createComment(commentData, token)
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

// updateComment
export const updateComment = createAsyncThunk(
  "updateComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.updateComment(commentData, token)
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

// getAllComments
export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (postId, thunkAPI) => {
    try {
      return await commentService.getAllComments(postId)
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

// deleteComment
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.deleteComment(commentData, token)
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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // createComment
      .addCase(createComment.pending, (state) => {
        state.commentsSlice__isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isSuccess = true
        state.commentsSlice_commentSingle = action.payload
        state.commentsSlice_commentsAll.unshift(action.payload.comment)
        state.commentsSlice_message = action.payload.message
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isError = true
        state.commentsSlice_message = action.payload.message
        state.commentsSlice_commentSingle = []
      })
      // updateComment
      .addCase(updateComment.pending, (state) => {
        state.commentsSlice__isLoading = true
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isSuccess = true
        state.commentsSlice_commentSingle = action.payload.comment
        state.commentsSlice_message = action.payload.message
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isError = true
        state.commentsSlice_message = action.payload
        state.commentsSlice_commentSingle = []
      })
      // getAllComments
      .addCase(getAllComments.pending, (state) => {
        state.commentsSlice_isLoading = true
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isSuccess = true
        state.commentsSlice_commentsAll = action.payload
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isError = true
        state.commentsSlice_message = action.payload
        state.commentsSlice_commentsAll = []
      })
      // deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true
        state.commentsSlice_message = ""
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.commentsSlice_commentsAll =
          state.commentsSlice_commentsAll.filter(
            (item) => item.id !== +action.payload.id
          )
        state.commentsSlice_commentSingle = []
        state.commentsSlice_message = action.payload.message
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.commentsSlice_message = action.payload
      })
  },
})

export const { resetComments } = commentSlice.actions

export default commentSlice.reducer
