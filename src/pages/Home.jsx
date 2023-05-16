import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Chip, Grid, Tab, Tabs } from "@mui/material"

import {
  fetchPosts,
  fetchPopularTags,
  setCategoryValue,
  fetchTag,
  setCurrentPage,
  setSearchValue,
} from "../redux/slices/posts-slice"
import { selectIsAuth } from "../redux/slices/auth-slice"
import { Post } from "../components/Post"
import { TagsBlock } from "../components/TagsBlock"
import { NotFound } from "./NotFound"
import { Pagination } from "../components/Pagination"
import { ButtonScrollUp } from "../components/ButtonScrollUp"

export const Home = () => {
  const { tag } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isAuth = useSelector(selectIsAuth)

  const userData = useSelector((state) => state.auth.data)
  const { tags } = useSelector((state) => state.posts)
  const { items, status, currentPage, categoryValue, searchValue } =
    useSelector((state) => state.posts.posts)

  const isPostsLoading = status === "loading"
  const isTagsLoading = tags.status === "loading"

  const onCklickCategory = (value) => {
    dispatch(setCategoryValue(value))
    dispatch(setCurrentPage(1))
  }

  const handleDelete = () => {
    navigate("/")
    dispatch(setSearchValue(""))
  }

  const userId = userData?._id

  React.useEffect(() => {
    if (!tag) {
      dispatch(fetchPosts({ currentPage, searchValue, categoryValue, userId }))
      window.scrollTo(0, 0)
    }

    if (tag) {
      dispatch(fetchTag({ tag, currentPage }))
      dispatch(setCurrentPage(1))
      window.scrollTo(0, 0)
    }
  }, [categoryValue, currentPage, searchValue, tag])

  React.useEffect(() => {
    dispatch(fetchPopularTags())
  }, [])

  return (
    <>
      {!tag ? (
        <Tabs
          style={{ marginBottom: 15 }}
          value={categoryValue}
          aria-label="basic tabs example"
        >
          <Tab label="New" onClick={() => onCklickCategory("0")} value={"0"} />
          <Tab
            label="Popular"
            onClick={() => onCklickCategory("1")}
            value={"1"}
          />
          {isAuth && (
            <Tab
              label="My posts"
              onClick={() => onCklickCategory("2")}
              value={"2"}
            />
          )}
        </Tabs>
      ) : (
        <Chip
          color="primary"
          label={"#" + tag}
          onDelete={handleDelete}
          sx={{
            m: 1,
            mb: 3,
            fontSize: "16px",
          }}
        />
      )}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : items.posts)?.map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:9999${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
          {items.totalPages === 0 && <NotFound />}
          {!isPostsLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={items.totalPages}
            />
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <ButtonScrollUp />
        </Grid>
      </Grid>
    </>
  )
}
