import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/auth-slice"
import { postsReducer } from "./slices/posts-slice"
import { commentsReducer } from "./slices/comments-slice"
import { usersReducer } from "./slices/users-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

export default store
