import React from "react"

import styles from "./NotFound.module.scss"
import { Button } from "@mui/material"

import { useDispatch } from "react-redux"
import { setSearchValue } from "../../redux/slices/posts-slice"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onClickClear = () => {
    dispatch(setSearchValue(""))
    navigate("/")
  }

  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Sorry, not found
      </h1>
      <Button variant="contained" onClick={onClickClear}>
        Back
      </Button>
    </div>
  )
}
