import React from "react"
import ReactPaginate from "react-paginate"
import { useDispatch } from "react-redux"
import { setCurrentPage } from "../../redux/slices/posts-slice"

import styles from "./Pagination.module.scss"

export const Pagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch()

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  return (
    <>
      {totalPages !== 0 && (
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(event) => onChangePage(event.selected + 1)}
          pageRangeDisplayed={8}
          pageCount={totalPages}
          forcePage={currentPage - 1}
        />
      )}
    </>
  )
}
