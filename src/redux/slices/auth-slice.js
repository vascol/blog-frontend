import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

// login user
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post(`/auth/login`, params)
    return data
  }
)

// register user
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post(`/auth/register`, params)
    return data
  }
)

// authorization
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get(`/auth/me`)
  return data
})

// Delete account
export const fetchDeleteAccount = createAsyncThunk(
  "posts/fetchDeleteAccount",
  async (id) => {
    axios.delete(`/auth/delete/${id}`)
  }
)

const initialState = {
  data: null,
  status: "loading", // loading | loaded | error
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchLogin.rejected]: (state) => {
      state.status = "error"
      state.data = null
    },
    // ========================================
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error"
      state.data = null
    },
    // ========================================
    [fetchRegister.pending]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error"
      state.data = null
    },
    // // ========================================
    [fetchDeleteAccount.pending]: (state) => {
      state.data = null
    },
  },
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const { logout } = authSlice.actions

export const authReducer = authSlice.reducer
