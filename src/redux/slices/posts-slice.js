import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

//  Get posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ currentPage, searchValue, categoryValue, userId }) => {
    const { data } = await axios.get(
      `/posts?page=${currentPage}&search=${searchValue}&category=${categoryValue}&userId=${userId}`
    )
    return data
  }
)

// Delete post
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`)
  }
)

// Populars tags
export const fetchPopularTags = createAsyncThunk(
  "posts/fetchPopularTags",
  async () => {
    const { data } = await axios.get(`/tags`)
    return data
  }
)

// Get tag
export const fetchTag = createAsyncThunk(
  "posts/fetchTag",
  async ({ tag, currentPage }) => {
    const { data } = await axios.get(`/tag?tag=${tag}&page=${currentPage}`)
    return data
  }
)

const initialState = {
  posts: {
    items: [],
    categoryValue: "0",
    currentPage: 1,
    searchValue: "",
    status: "loading", // loading | loaded | error
  },
  tags: {
    items: [],
    status: "loading", // loading | loaded | error
  },
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategoryValue(state, action) {
      state.posts.categoryValue = action.payload
    },
    setSearchValue(state, action) {
      state.posts.searchValue = action.payload
    },
    setCurrentPage(state, action) {
      state.posts.currentPage = action.payload
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = "error"
    },
    // ========================================
    [fetchPopularTags.pending]: (state) => {
      state.tags.items = []
      state.tags.status = "loading"
    },
    [fetchPopularTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = "loaded"
    },
    [fetchPopularTags.rejected]: (state) => {
      state.tags.items = []
      state.tags.status = "error"
    },
    // ========================================
    [fetchTag.pending]: (state) => {
      state.posts.items = []
      state.posts.status = "loading"
    },
    [fetchTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded"
    },
    [fetchTag.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = "error"
    },
    // ========================================
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items.posts = state.posts.items.posts.filter(
        (obj) => obj._id !== action.meta.arg
      )
    },
  },
})

export const { setCategoryValue, setSearchValue, setCurrentPage } =
  postsSlice.actions

export const postsReducer = postsSlice.reducer
