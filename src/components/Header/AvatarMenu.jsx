import * as React from "react"
import { Link } from "react-router-dom"

import styles from "./Header.module.scss"

import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AccountBoxIcon from "@mui/icons-material/AccountBox"

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

export const AvatarMenu = ({ me }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginRight: "15px",
          cursor: "pointer",
          border: "1px solid #c9d1c8 ",
          borderRadius: "50%",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={me.fullName}
            src={me.avatarUrl}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to={`/user/${me._id}`} className={styles.link}>
              <MenuItem onClick={handleClose} sx={{ color: "#04202c" }}>
                <AccountBoxIcon sx={{ pr: 1, fontSize: "32px" }} />
                My account
              </MenuItem>
            </Link>
          </Menu>
        </StyledBadge>
      </Stack>
    </div>
  )
}
