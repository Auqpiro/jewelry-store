import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appDispatch } from "@store/index";
import { fetchIdsAll } from "@store/slices/items";

function Layout() {
  const dispatch = useDispatch<appDispatch>();
  const onClick = () => dispatch(fetchIdsAll())
  return (
    <>
      <button onClick={onClick}>Layout</button>
      <Outlet />
    </>
  );
}

export default Layout;
