import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import searchService from "./searchService"

const initialState = {
  articles: [],
  singleArticle: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// getSearch _____________________________________________________________________________________
export const getSearch = createAsyncThunk(
  "getSearch",
  async (search, thunkAPI) => {
    try {
      return await searchService.getSearch(search)
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

const searchSlice = createSlice({
  name: "articleStore",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // getSearch _____________________________________________________________________________________
      .addCase(getSearch.pending, (state) => {
        state.isLoading = true
        // state.message = ""
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = action.payload
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.articles = []
      })
  },
})

export const { reset } = searchSlice.actions

export default searchSlice.reducer
