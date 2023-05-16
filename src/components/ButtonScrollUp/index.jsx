import React from "react"
import styles from "./ButtonScrollUp.module.scss"

import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"

export const ButtonScrollUp = () => {
  const btnRef = React.useRef()

  const [isHidden, setIsHidden] = React.useState(true)

  const smoothLinks = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  React.useEffect(() => {
    window.onscroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 500) {
        if (isHidden) {
          setIsHidden(false)
        }
      } else {
        if (!isHidden) {
          setIsHidden(true)
        }
      }
    }
  }, [isHidden])

  return (
    <>
      {!isHidden && (
        <div ref={btnRef} className={styles.wrapper}>
          <KeyboardArrowUpOutlinedIcon
            fontSize="large"
            className={styles.btn}
            variant="contained"
            onClick={smoothLinks}
            aria-label="scroll"
          />
        </div>
      )}
    </>
  )
}
