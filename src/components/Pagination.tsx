import { useSelector } from "react-redux"
import { rootState } from "@store/index"

function Pagination() {
  const {currentPage, maxPage} = useSelector((state: rootState) => {
    return state.pagination
  })
  return (
    <div>Pagination {currentPage}/{maxPage}</div>
  )
}

export default Pagination