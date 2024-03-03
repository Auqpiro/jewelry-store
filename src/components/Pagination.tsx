import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@store/index";
import { changePage } from "@store/slices/pagination";
import { loadCurrentPage } from "@store/slices/items";
import { useEffect, useState } from "react";
import { useThrottle } from "@hooks/useThrottle";

function Pagination() {
  const { currentPage, maxPage } = useSelector((state: rootState) => {
    return state.pagination;
  });

  const [page, setPage] = useState(currentPage);
  const [isTouched, setTouch] = useState(false);
  const prev = () => {
    setTouch(true);
    setPage((prev) => prev - 1);
  };
  const next = () => {
    setTouch(true);
    setPage((prev) => prev + 1);
  };

  const throttledPage = useThrottle(currentPage, page);
  const dispatch = useDispatch<appDispatch>();
  useEffect(() => {
    if (isTouched) {
      dispatch(changePage(throttledPage));
      dispatch(loadCurrentPage());
    }
  }, [dispatch, throttledPage, isTouched]);

  return (
    <div>
      <button onClick={prev} disabled={page === 1}>
        prev
      </button>
      <span>
        {page}/{maxPage}
      </span>
      <button onClick={next} disabled={page === maxPage}>
        next
      </button>
    </div>
  );
}

export default Pagination;
