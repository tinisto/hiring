import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import questionService from "./questionService"

// createQuestion,
// getAllQuestion,
// getOneQuestionById,
// editQuestion,
// deleteQuestion,

const initialState = {
  allQuestions: [],
  singleQuestion: [],
  isLoadingQuestion: false,
  isSuccessQuestion: false,
  isErrorQuestion: false,
  messageQuestion: "",
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
        state.isLoadingQuestion = true
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.isLoadingQuestion = false
        state.isSuccessQuestion = true
        state.allQuestions.unshift(action.payload)
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoadingQuestion = false
        state.isErrorQuestion = true
        state.messageQuestion = action.payload
        state.allQuestions = []
      })
      // getAllQuestion _____________________________________________________________________________________
      .addCase(getAllQuestion.pending, (state) => {
        state.isLoadingQuestion = true
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.isLoadingQuestion = false
        state.isSuccessQuestion = true
        state.allQuestions = action.payload
      })
      .addCase(getAllQuestion.rejected, (state, action) => {
        state.isLoadingQuestion = false
        state.isErrorQuestion = true
        state.messageQuestion = action.payload
        state.allQuestions = []
      })

      // getOneQuestionById _____________________________________________________________________________________
      .addCase(getOneQuestionById.pending, (state) => {
        state.isLoadingQuestion = true
      })
      .addCase(getOneQuestionById.fulfilled, (state, action) => {
        state.isLoadingQuestion = false
        state.isSuccessQuestion = true
        state.singleQuestion = action.payload
      })
      .addCase(getOneQuestionById.rejected, (state, action) => {
        state.isLoadingQuestion = false
        state.isErrorQuestion = true
        state.messageQuestion = action.payload
        state.singleQuestion = []
      })

      // editQuestion _____________________________________________________________________________________
      .addCase(editQuestion.pending, (state) => {
        state.isLoadingQuestion = true
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.isLoadingQuestion = false
        state.isSuccessQuestion = true
        state.singleQuestion = action.payload
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoadingQuestion = false
        state.isErrorQuestion = true
        state.messageQuestion = action.payload
        state.singleQuestion = []
      })

      // deleteQuestion _____________________________________________________________________________________
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoadingQuestion = true
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoadingQuestion = false
        state.isSuccessQuestion = true
        state.allQuestions = state.allQuestions.filter(
          (item) => item.id !== +action.payload.id
        )
        state.singleQuestion = []
        state.messageQuestion = action.payload.messageQuestion
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoadingQuestion = false
        state.isErrorQuestion = true
        state.messageQuestion = action.payload
        state.allQuestions = []
      })
  },
})

export const { reset } = questionSlice.actions

export default questionSlice.reducer
