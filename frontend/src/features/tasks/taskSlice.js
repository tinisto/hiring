import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import taskService from "./taskService.js"

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

// createTask _____________________________________________________________________________________
export const createTask = createAsyncThunk(
  "createTask",
  async (formData, thunkAPI) => {
    try {
      return await taskService.createTask(formData)
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

// getAllTasks _____________________________________________________________________________________
export const getAllTasks = createAsyncThunk(
  "getAllTasks",
  async (_, thunkAPI) => {
    try {
      return await taskService.getAllTasks()
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

// getTaskByID _____________________________________________________________________________________
export const getTaskByID = createAsyncThunk(
  "getTaskByID",
  async (id, thunkAPI) => {
    try {
      return await taskService.getTaskByID(id)
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

// editTask _____________________________________________________________________________________
export const editTask = createAsyncThunk(
  "editTask",
  async (formData, thunkAPI) => {
    try {
      return await taskService.editTask(formData)
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

// deleteTask _____________________________________________________________________________________
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id)
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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder

      // createTask _____________________________________________________________________________________
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.unshift(action.payload)
        state.message = "Task created successfully"
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })

      // getAllTasks _____________________________________________________________________________________
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })

      // getTaskByID _____________________________________________________________________________________
      .addCase(getTaskByID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTaskByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTaskByID.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })

      // editTask _____________________________________________________________________________________
      .addCase(editTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.tasks = action.payload

        state.tasks = state.tasks.map((obj) => {
          if (obj.id === action.payload.id) {
            return {
              ...obj,
              name: action.payload.name,
              completed: action.payload.completed,
            }
          }
          return obj
        })
        state.message = "Task edited successfully"
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })

      // deleteTask _____________________________________________________________________________________
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.filter((task) => task.id !== +action.payload)
        state.message = "Task deleted successfully"
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })
  },
})

export const { reset } = taskSlice.actions

export default taskSlice.reducer
