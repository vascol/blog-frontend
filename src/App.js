import React from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe } from "./redux/slices/auth-slice"

import { Header, Preloader } from "./components"
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  NotFound,
  User,
} from "./pages"

import Container from "@mui/material/Container"

function App() {
  const dispatch = useDispatch()

  const { status } = useSelector((state) => state.auth)

  const isAuthLoading = status === "loading"

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  if (isAuthLoading) {
    return <Preloader />
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="tag/:tag" element={<Home />} />
          </Route>
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
