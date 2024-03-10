import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentPage } from "@store/slices/items";
import Items from "@components/Items/Items";
import PendingItems from "@components/Items/PendingItems";
import { appDispatch, rootState } from "@store/index";

function PanelItems() {
  const dispatch = useDispatch<appDispatch>();
  const isFetchIds = useSelector((state: rootState) => state.items.isFetching.ids);
  const isFetchItem = useSelector((state: rootState) => state.items.isFetching.items);
  const isFetch = isFetchIds || isFetchItem;
  useEffect(() => {
    const controller = new AbortController();
    if (!isFetchIds) {
      dispatch(loadCurrentPage(controller.signal));
    }
    return () => controller.abort();
  }, [dispatch, isFetchIds]);
  return (
    <section className="mb-5">
      {isFetch ? <PendingItems /> : <Items />}
    </section>
  );
}

export default PanelItems;
