import React from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import clsx from "clsx"

import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"

import styles from "./Post.module.scss"

import { UserInfo } from "../UserInfo"
import { PostSkeleton } from "./Skeleton"
import { fetchRemovePost } from "../../redux/slices/posts-slice"

import moment from "moment"

export const Post = React.memo(
  ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    tags,
    children,
    isFullPost,
    isLoading,
    isEditable,
  }) => {
    const dispatch = useDispatch()

    const onClickRemove = () => {
      if (window.confirm("Do you really want to delete this post??")) {
        dispatch(fetchRemovePost(id))
      }
    }

    const createdDate = moment(createdAt).locale("en-us").format("LL")

    if (isLoading) {
      return <PostSkeleton />
    }

    return (
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/posts/${id}/edit`}>
              <IconButton sx={{ color: "#0288d1" }}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}

        <div className={styles.wrapper}>
          <UserInfo {...user} additionalText={createdDate} />

          <div className={styles.indention}>
            {imageUrl && (
              <Link to={`/posts/${id}`}>
                <img
                  className={clsx(styles.image, {
                    [styles.imageFull]: isFullPost,
                  })}
                  src={imageUrl}
                  alt={title}
                />
              </Link>
            )}
            <h2
              className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
            >
              {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
            </h2>
            <ul className={styles.tags}>
              {tags.map((name) => (
                <li key={name}>
                  {name && <Link to={`/tag/${name}`}>#{name}</Link>}
                </li>
              ))}
            </ul>
            {children && <div className={styles.content}>{children}</div>}
            <ul className={styles.postDetails}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              <li>
                <CommentIcon />
                <span>{commentsCount}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
)
