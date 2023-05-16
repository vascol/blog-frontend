import React from "react"
import { Link } from "react-router-dom"

import { SideBlock } from "./SideBlock"

import Skeleton from "@mui/material/Skeleton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"

export const TagsBlock = React.memo(({ items, isLoading = true }) => {
  return (
    <SideBlock title="Popular tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((tag, i) => (
          <Link
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tag/${tag}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={tag} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  )
})
