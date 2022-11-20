import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import articleService from "./articleService"

const initialState = {
  articles: [],
  singleArticle: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// createArticle,
// getAllArticle,
// getOneArticleById,
// editArticle,
// deleteArticle,

// createArticle _____________________________________________________________________________________
export const createArticle = createAsyncThunk(
  "createArticle",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.createArticle(formData, token)
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

// getAllArticle _____________________________________________________________________________________
export const getAllArticle = createAsyncThunk(
  "getAllArticle",
  async (_, thunkAPI) => {
    try {
      return await articleService.getAllArticle()
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

// getArticlesByCategory _____________________________________________________________________________________
export const getArticlesByCategory = createAsyncThunk(
  "getArticlesByCategory",
  async (urlLink, thunkAPI) => {
    try {
      return await articleService.getArticlesByCategory(urlLink)
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

// getOneArticleById _____________________________________________________________________________________
export const getOneArticleById = createAsyncThunk(
  "getOneArticleById",
  async (data, thunkAPI) => {
    try {
      return await articleService.getOneArticleById(data)
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

// editArticle _____________________________________________________________________________________
export const editArticle = createAsyncThunk(
  "editArticle",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.editArticle(formData, token)
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

// deleteArticle _____________________________________________________________________________________
export const deleteArticle = createAsyncThunk(
  "deleteArticle",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.deleteArticle(formData, token)
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

const articleSlice = createSlice({
  name: "articleStore",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // createArticle _____________________________________________________________________________________
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles.unshift(action.payload)
        state.message = action.payload.message
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.articles = []
      })

      // getAllArticle _____________________________________________________________________________________
      .addCase(getAllArticle.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(getAllArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = action.payload
      })
      .addCase(getAllArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.articles = []
      })

      // getArticlesByCategory _____________________________________________________________________________________
      .addCase(getArticlesByCategory.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(getArticlesByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = action.payload
      })
      .addCase(getArticlesByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.articles = []
      })

      // getOneArticleById _____________________________________________________________________________________
      .addCase(getOneArticleById.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(getOneArticleById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleArticle = action.payload
      })
      .addCase(getOneArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.singleArticle = []
      })

      // editArticle _____________________________________________________________________________________
      .addCase(editArticle.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleArticle = action.payload
        state.message = action.payload.message
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.singleArticle = []
      })

      // deleteArticle _____________________________________________________________________________________
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = state.articles.filter(
          (item) => item.id !== +action.payload.id
        )
        state.singleArticle = []
        state.message = action.payload.message
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.articles = []
      })
  },
})

export const { reset } = articleSlice.actions

export default articleSlice.reducer
