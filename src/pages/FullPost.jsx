import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "../axios"
import ReactMarkdown from "react-markdown"

import { Post } from "../components/Post"
import { Index } from "../components/AddComment"
import { CommentsBlock } from "../components/CommentsBlock"
import { fetchPostComments } from "../redux/slices/comments-slice"
import { selectIsAuth } from "../redux/slices/auth-slice"
import { ButtonScrollUp } from "../components/ButtonScrollUp"

export const FullPost = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const isAuth = useSelector(selectIsAuth)

  const { commentData } = useSelector((state) => state.comments)

  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  const [isCommentLoading, setCommentLoading] = React.useState(true)

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert("Error, post not received")
      })
  }, [])

  React.useEffect(() => {
    if (isCommentLoading) {
      dispatch(fetchPostComments(id))
    }
    setCommentLoading(false)
  }, [isCommentLoading])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:9999${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={commentData}
        isLoading={isCommentLoading}
        isAuth={isAuth}
      >
        {isAuth && <Index setCommentLoading={setCommentLoading} />}
      </CommentsBlock>
      <ButtonScrollUp />
    </>
  )
}
