import React from "react"
import styles from "./Preloader.module.scss"
import preloader from "../assets/preloader.gif"

export const Preloader = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={preloader} alt="loading..." />
    </div>
  )
}
