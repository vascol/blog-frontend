import React from "react"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"

import styles from "./Login.module.scss"

import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth-slice"

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert("Failed to register!")
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
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("fullName", { required: "Enter a name" })}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          className={styles.field}
          label="Full name"
          fullWidth
        />
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
          label="Password"
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
          Sign up
        </Button>
      </form>
    </Paper>
  )
}
