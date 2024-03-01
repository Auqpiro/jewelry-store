import { rootState } from "@store/index"
import { useSelector } from "react-redux"

function Pagination() {
  const {currentPage, maxPage} = useSelector((state: rootState) => {
    return state.pagination
  })
  return (
    <div>Pagination {currentPage}/{maxPage}</div>
  )
}

export default Pagination