import Item from "@components/Items/Item";
import { appDispatch, rootState } from "@store/index";
import { loadCurrentPage } from "@store/slices/items";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingItem from "./ItemPending";

function PanelItems() {
  const dispatch = useDispatch<appDispatch>();
  const isFetchIds = useSelector((state: rootState) => state.items.isFetching.ids);
  const isFetchItem = useSelector((state: rootState) => state.items.isFetching.items);
  const isFetch = isFetchIds || isFetchItem;
  const items = useSelector((state: rootState) => state.items.items);
  useEffect(() => {
    if (!isFetchIds) {
      dispatch(loadCurrentPage());
    }
  }, [dispatch, isFetchIds]);
  return (
    <div>
      <div>Items ({items.length})</div>
      {isFetch ? <PendingItem /> : <Item />}
    </div>
  );
}

export default PanelItems;
