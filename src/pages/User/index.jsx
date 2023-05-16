import React from "react"

import styles from "./User.module.scss"

import { Button, Grid } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useNavigate, useParams } from "react-router-dom"
import { fetchUser } from "../../redux/slices/users-slice"
import { fetchDeleteAccount } from "../../redux/slices/auth-slice"
import { setCategoryValue } from "../../redux/slices/posts-slice"
import { Preloader } from "../../components"

export const User = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const me = useSelector((state) => state.auth.data)
  const { data } = useSelector((state) => state.users.user)

  const [isLoaded, setLoaded] = React.useState(false)

  const authUser = Boolean(id === me?._id)

  const onClickDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? All comments and posts will also be deleted."
      )
    ) {
      dispatch(fetchDeleteAccount(id))
      navigate("/")
      dispatch(setCategoryValue("0"))
    }
  }

  React.useEffect(() => {
    dispatch(fetchUser(id))
    setLoaded(true)
  }, [id])

  if (!data) {
    return <Preloader />
  }

  return (
    <div>
      <Grid xs={4} item>
        <div className={styles.root}>
          <div className={styles.wrapper_avatar}>
            <img
              className={styles.avatar}
              src={data.avatarUrl || "/noavatar.png"}
              alt={data.fullName}
            />
          </div>
          <div className={styles.userDetails}>
            <div>
              <ul>
                <li>Name:</li>
                <li>{data.fullName}</li>
              </ul>
              <ul>
                <li>Date of joining:</li>
                <li>{moment(data.createdAt).locale("en-us").format("LL")}</li>
              </ul>
              {authUser && (
                <div className={styles.btn}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onClickDeleteAccount}
                  >
                    Delete your profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Grid>
    </div>
  )
}
