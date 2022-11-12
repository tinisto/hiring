import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import questionService from "./questionService"

// createQuestion,
// getAllQuestion,
// getOneQuestionById,
// editQuestion,
// deleteQuestion,

const initialState = {
  questions: [],
  singleQuestion: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// createQuestion _____________________________________________________________________________________
export const createQuestion = createAsyncThunk(
  "createQuestion",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.createQuestion(formData, token)
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

// getAllQuestion _____________________________________________________________________________________
export const getAllQuestion = createAsyncThunk(
  "getAllQuestion",
  async (_, thunkAPI) => {
    try {
      return await questionService.getAllQuestion()
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

// getOneQuestionById _____________________________________________________________________________________
export const getOneQuestionById = createAsyncThunk(
  "getOneQuestionById",
  async (id, thunkAPI) => {
    try {
      return await questionService.getOneQuestionById(id)
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

// editQuestion _____________________________________________________________________________________
export const editQuestion = createAsyncThunk(
  "editQuestion",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.editQuestion(formData, token)
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

// deleteQuestion _____________________________________________________________________________________
export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.deleteQuestion(id, token)
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

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // createQuestion _____________________________________________________________________________________
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions.unshift(action.payload)
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.questions = []
      })
      // getAllQuestion _____________________________________________________________________________________
      .addCase(getAllQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = action.payload
      })
      .addCase(getAllQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.questions = []
      })

      // getOneQuestionById _____________________________________________________________________________________
      .addCase(getOneQuestionById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneQuestionById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleQuestion = action.payload
      })
      .addCase(getOneQuestionById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.singleQuestion = []
      })

      // editQuestion _____________________________________________________________________________________
      .addCase(editQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleQuestion = action.payload
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.singleQuestion = []
      })

      // deleteQuestion _____________________________________________________________________________________
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = state.questions.filter(
          (item) => item.id !== +action.payload.id
        )
        state.singleQuestion = []
        state.message = action.payload.message
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.questions = []
      })
  },
})

export const { reset } = questionSlice.actions

export default questionSlice.reducer
