import React from "react"

import styles from "./AddComment.module.scss"

import TextField from "@mui/material/TextField"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux"

import axios from "../../axios"
import { useParams } from "react-router-dom"

export const Index = React.memo(({ setCommentLoading }) => {
  const { id } = useParams()

  const { _id, fullName, avatarUrl } = useSelector((state) => state.auth.data)

  const [text, setText] = React.useState("")

  const onSubmit = async () => {
    try {
      const fields = {
        postId: id,
        userId: _id,
        text,
      }
      await axios.post("/comments", fields)

      setText("")
      setCommentLoading(true)
    } catch (error) {
      console.warn(error)
      alert("No comment has been created!")
    }
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          alt={fullName}
          src={avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment..."
            variant="outlined"
            maxRows={10}
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ minLength: 1, maxLength: 420 }}
            fullWidth
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={!text && true}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  )
})
