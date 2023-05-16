import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

// Get user
export const fetchUser = createAsyncThunk("auth/fetchUser", async (id) => {
  const { data } = await axios.get(`/user/${id}`)
  return data
})

const initialState = {
  user: {
    data: null,
    status: "loading", // loading | loaded | error
  },
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading"
      state.user.data = null
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.user.data = action.payload
    },
    [fetchUser.rejected]: (state) => {
      state.status = "error"
      state.user.data = null
    },
  },
})

export const usersReducer = usersSlice.reducer
