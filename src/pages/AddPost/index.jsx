import React from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAuth } from "../../redux/slices/auth-slice"
import axios from "../../axios"

import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"

import TextField from "@mui/material/TextField"

import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import SimpleMDE from "react-simplemde-editor"

export const AddPost = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const isAuth = useSelector(selectIsAuth)

  const [isloading, setIsloading] = React.useState(false)
  const [text, setText] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [tags, setTags] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")

  const inputFileRef = React.useRef(null)

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append("image", file)
      const { data } = await axios.post("/upload", formData)
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error)
      alert("Error when downloading the file!")
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl("")
  }

  const onChange = React.useCallback((value) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      setIsloading(true)

      const fields = {
        imageUrl,
        title,
        tags,
        text,
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields)

      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (error) {
      console.warn(error)
      alert("Post not created!")
    }
  }

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setTags(data.tags.join(","))
          setText(data.text)
          setImageUrl(data.imageUrl)
        })
        .catch((error) => {
          console.warn(error)
          alert("Error, post not received!")
        })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter the text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Download preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:9999${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title of the post..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ minLength: 3, maxLength: 100 }}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        inputProps={{ maxLength: 50 }}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onSubmit}
          size="large"
          variant="contained"
          disabled={title && text ? false : true}
        >
          {isEditing ? "Save changes" : "Publish"}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  )
}
