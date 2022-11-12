import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// registerUser, loginUser, updateUser, logoutUser

// registerUser _____________________________________________________________________________________
export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData)
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

// loginUser _____________________________________________________________________________________
export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData, thunkAPI) => {
    try {
      return await authService.loginUser(formData)
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

// updateUser _____________________________________________________________________________________
export const updateUser = createAsyncThunk(
  "updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData)
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

// logoutUser _____________________________________________________________________________________
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, thunkAPI) => {
    try {
      return await authService.logoutUser()
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      //registerUser _____________________________________________________________________________________
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      //loginUser _____________________________________________________________________________________
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      //updateUser _____________________________________________________________________________________
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      //logoutUser _____________________________________________________________________________________
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
