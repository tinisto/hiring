import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import newsService from "./newsService"

const initialState = {
  allNews: [],
  singleNews: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// createNews,
// getAllNews,
// getOneNewsById,
// editNews,
// deleteNews,

// createNews _____________________________________________________________________________________ createNews
export const createNews = createAsyncThunk(
  "createNews",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.createNews(formData, token)
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

// getAllNews _____________________________________________________________________________________ getAllNews
export const getAllNews = createAsyncThunk(
  "getAllNews",
  async (_, thunkAPI) => {
    try {
      return await newsService.getAllNews()
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

// getOneNewsById _____________________________________________________________________________________ getOneNewsById
export const getOneNewsById = createAsyncThunk(
  "getOneNewsById",
  async (id, thunkAPI) => {
    try {
      return await newsService.getOneNewsById(id)
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

// editNews _____________________________________________________________________________________ editNews
export const editNews = createAsyncThunk(
  "editNews",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.editNews(formData, token)
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

// deleteNews _____________________________________________________________________________________ deleteNews
export const deleteNews = createAsyncThunk(
  "deleteNews",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.deleteNews(id, token)
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

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // createNews _____________________________________________________________________________________
      .addCase(createNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allNews = action.payload
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.allNews = []
      })

      // getAllNews _____________________________________________________________________________________
      .addCase(getAllNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allNews = action.payload
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.allNews = []
      })

      // getOneNewsById _____________________________________________________________________________________
      .addCase(getOneNewsById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneNewsById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleNews = action.payload
      })
      .addCase(getOneNewsById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.singleNews = []
      })

      // editNews _____________________________________________________________________________________
      .addCase(editNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleNews = action.payload
      })
      .addCase(editNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.singleNews = []
      })

      // deleteNews _____________________________________________________________________________________
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allNews = state.allNews.filter(
          (item) => item.id !== +action.payload.id
        )
        state.singleNews = []
        state.message = action.payload.message
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.allNews = []
      })
  },
})

export const { reset } = newsSlice.actions

export default newsSlice.reducer
