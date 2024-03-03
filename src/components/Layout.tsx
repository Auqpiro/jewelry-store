import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchIdsAll } from "@store/slices/items";
import { appDispatch } from "@store/index";
import { useEffect, useState } from "react";

function Layout() {
  const [click, setClick] = useState(0);
  const onClick = () => setClick((prev) => prev + 1);
  
  const dispatch = useDispatch<appDispatch>();
  useEffect(() => {
    if (!click) {
      return;
    }
    const controller = new AbortController();
    dispatch(fetchIdsAll(controller.signal));
    return () => controller.abort();
  }, [dispatch, click]);

  return (
    <>
      <button onClick={onClick}>Layout</button>
      <Outlet />
    </>
  );
}

export default Layout;
