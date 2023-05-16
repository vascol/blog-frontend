import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

// Get comments on the post
export const fetchPostComments = createAsyncThunk(
  "comments/fetchPostComments",
  async (id) => {
    const { data } = await axios.get(`/comments/${id}`)
    return data
  }
)

// Delete comment
export const fetchRemoveComment = createAsyncThunk(
  "comments/fetchRemoveComment",
  async ({ commentId, postId }) => {
    axios.delete(`post/${postId}/comments/${commentId}/`)
  }
)

const initialState = {
  commentData: [],
  status: "loading", // loading | loaded | error
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostComments.pending]: (state) => {
      state.status = "loading"
      state.commentData = []
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.commentData = action.payload
    },
    [fetchPostComments.rejected]: (state) => {
      state.status = "error"
      state.commentData = []
    },
    // =====================================================
    [fetchRemoveComment.pending]: (state, action) => {
      state.commentData = state.commentData.filter(
        (obj) => obj._id !== action.meta.arg.commentId
      )
    },
  },
})

export const commentsReducer = commentsSlice.reducer
