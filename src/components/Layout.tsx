import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@store/index";
import { fetchIdsAll } from "@store/slices/items";

function Layout() {
  const dispatch = useDispatch<appDispatch>();
  const isFetchIds = useSelector((state: rootState) => state.items.isFetching.ids);
  const isFetchItem = useSelector((state: rootState) => state.items.isFetching.items);
  const isFetch = isFetchIds || isFetchItem;
  const onClick = () => {
    if (!isFetch) {
      dispatch(fetchIdsAll());
    }
  };
  return (
    <>
      <button onClick={onClick}>Layout</button>
      <Outlet />
    </>
  );
}

export default Layout;
