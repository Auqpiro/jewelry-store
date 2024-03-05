import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThrottle } from "@hooks/useThrottle";
import { changePage } from "@store/slices/pagination";
import { loadCurrentPage } from "@store/slices/items";
import { Container, Pagination as Page } from "react-bootstrap";
import { appDispatch, rootState } from "@store/index";

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
    const controller = new AbortController();
    if (isTouched) {
      dispatch(changePage(throttledPage));
      dispatch(loadCurrentPage(controller.signal));
    }
    return () => controller.abort();
  }, [dispatch, throttledPage, isTouched]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <Page size="sm" className="justify-content-center">
        <Page.Prev onClick={prev} disabled={page === 1} />
        <Page.Item>
          {page}/{maxPage}
        </Page.Item>
        <Page.Next onClick={next} disabled={page === maxPage} />
      </Page>
    </Container>
  );
}

export default Pagination;
