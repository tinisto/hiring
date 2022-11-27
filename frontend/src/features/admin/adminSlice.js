import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import adminService from "./adminService"

const initialState = {
  commentsSlice_isError: [],
  commentsSlice_isSuccess: false,
  commentsSlice_isLoading: false,
  commentsSlice_message: "",
  commentsSlice_commentSingle: [],
  commentsSlice_commentsAll: [],
  admin_AllUsers: [],
}

// createComment,
// getAllComments,
// updateComment,
// deleteComment,

// getAllComments _____________________________________________________________________________________
export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await adminService.getAllComments(token)
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

// createComment _____________________________________________________________________________________
export const createComment = createAsyncThunk(
  "createComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.createComment(commentData, token)
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

// updateComment _____________________________________________________________________________________
export const updateComment = createAsyncThunk(
  "updateComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.updateComment(commentData, token)
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

// deleteComment _____________________________________________________________________________________
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.deleteComment(id, token)
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

// getAllUsers _____________________________________________________________________________________
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await adminService.getAllUsers(token)
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

// getSearch _____________________________________________________________________________________
export const getSearch = createAsyncThunk(
  "getAllComments",
  async (_, thunkAPI) => {
    try {
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // createComment _____________________________________________________________________________________
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

      // getAllComments _____________________________________________________________________________________
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

      // updateComment _____________________________________________________________________________________
      .addCase(updateComment.pending, (state) => {
        state.commentsSlice__isLoading = true
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isSuccess = true
        state.commentsSlice_commentSingle = action.payload.comment
        state.commentsSlice_message = action.payload.message
        state.commentsSlice_commentsAll = state.commentsSlice_commentsAll.map(
          (obj) => {
            if (obj.id === action.payload.commentId) {
              return {
                ...obj,
                commentText: action.payload.commentText,
              }
            }
            return obj
          }
        )
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isError = true
        state.commentsSlice_message = action.payload
        state.commentsSlice_commentSingle = []
      })

      // deleteComment _____________________________________________________________________________________
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
      // getAllUsers _____________________________________________________________________________________
      .addCase(getAllUsers.pending, (state) => {
        state.commentsSlice_isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isSuccess = true
        state.admin_AllUsers = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.commentsSlice_isLoading = false
        state.commentsSlice_isError = true
        state.commentsSlice_message = action.payload
        state.admin_AllUsers = []
      })
  },
})

export const { reset } = adminSlice.actions

export default adminSlice.reducer
