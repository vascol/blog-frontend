import React from "react"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"

import styles from "./Login.module.scss"

import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth-slice"

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "test3@test.com",
      password: "1234521",
    },
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values))

    if (!data.payload) {
      return alert("Login failed! Incorrect email or password.")
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", { required: "Enter your email address" })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          type="email"
          fullWidth
        />
        <TextField
          {...register("password", { required: "Enter a password" })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign in
        </Button>
      </form>
    </Paper>
  )
}
