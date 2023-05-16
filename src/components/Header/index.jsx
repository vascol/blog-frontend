import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout, selectIsAuth } from "../../redux/slices/auth-slice"
import { setCategoryValue } from "../../redux/slices/posts-slice"
import { Search } from "../Search"

import { AvatarMenu } from "./AvatarMenu"

import styles from "./Header.module.scss"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

export const Header = React.memo(() => {
  const dispatch = useDispatch()

  const location = useLocation()

  const navigate = useNavigate()

  const isAuth = useSelector(selectIsAuth)

  const me = useSelector((state) => state.auth.data)

  const onClickLogout = () => {
    if (window.confirm("You really want to get out?")) {
      dispatch(logout(null))
      window.localStorage.removeItem("token")
      navigate("/")
      dispatch(setCategoryValue("0"))
    }
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MY BLOG</div>
          </Link>
          {location.pathname === "/" && <Search />}
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <AvatarMenu me={me} onClickLogout={onClickLogout} />
                <div>
                  <Link to="/add-post">
                    <Button variant="contained">Add post</Button>
                  </Link>
                  <Button
                    onClick={onClickLogout}
                    variant="contained"
                    color="error"
                  >
                    <LogoutOutlinedIcon />
                    Exit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Registration</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
})
