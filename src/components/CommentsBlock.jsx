import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import styles from "./Search/Search.module.scss"

import { fetchRemoveComment } from "../redux/slices/comments-slice"

import { SideBlock } from "./SideBlock"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import { Stack, Typography } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"

import moment from "moment"

export const CommentsBlock = ({
  items,
  children,
  isAuth,
  isLoading = true,
}) => {
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.auth.data)

  const onClickRemove = React.useCallback((commentId, postId) => {
    dispatch(fetchRemoveComment({ commentId, postId }))
  }, [])

  return (
    <SideBlock
      title={isAuth || items.length !== 0 ? "Comments" : "No comments yet..."}
    >
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <Stack>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">
                        {obj.user.fullName}
                      </Typography>
                    }
                    secondary={<Typography variant="h6">{obj.text}</Typography>}
                  />
                  <div style={{ fontSize: "12px" }}>
                    {moment(obj.createdAt).locale("en-us").fromNow()}
                  </div>

                  {userData?._id === obj.user._id && (
                    <svg
                      onClick={() => onClickRemove(obj._id, obj.post)}
                      className={styles.clearIcon}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                  )}
                </Stack>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
        {!isAuth && (
          <h5 style={{ textAlign: "center" }}>
            <Link to="/login">Login</Link>, or
            <Link to="/register"> Sign up</Link>
          </h5>
        )}
      </List>

      {children}
    </SideBlock>
  )
}
