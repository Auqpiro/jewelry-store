import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@store/index";
import { changePage } from "@store/slices/pagination";
import { loadCurrentPage } from "@store/slices/items";

function Pagination() {
  const { currentPage, maxPage } = useSelector((state: rootState) => {
    return state.pagination;
  });
  const dispatch = useDispatch<appDispatch>();
  const prev = () => {
    dispatch(changePage(currentPage - 1));
    dispatch(loadCurrentPage());
  };
  const next = () => {
    dispatch(changePage(currentPage + 1));
    dispatch(loadCurrentPage());
  };
  return (
    <div>
      <button onClick={prev} disabled={currentPage === 1}>
        prev
      </button>
      <span>
        {currentPage}/{maxPage}
      </span>
      <button onClick={next} disabled={currentPage === maxPage}>
        next
      </button>
    </div>
  );
}

export default Pagination;
