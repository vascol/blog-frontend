import React from "react"
import { Link } from "react-router-dom"
import styles from "./UserInfo.module.scss"

export const UserInfo = React.memo(
  ({ _id, avatarUrl, fullName, additionalText }) => {
    return (
      <div className={styles.root}>
        <Link to={`/user/${_id}`}>
          <img
            className={styles.avatar}
            src={avatarUrl || "/noavatar.png"}
            alt={fullName}
          />
        </Link>
        <div className={styles.userDetails}>
          <span className={styles.userName}>{fullName}</span>
          <span className={styles.additional}>{additionalText}</span>
        </div>
      </div>
    )
  }
)
