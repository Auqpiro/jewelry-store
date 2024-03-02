import { useDispatch, useSelector } from "react-redux";
import { fetchIdsAll } from "@store/slices/items";
import { appDispatch, rootState } from "@store/index";
import Search from "@components/Filter/Search";
import Select from "@components/Filter/Select";
import Range from "@components/Filter/Range";

function PanelFilter() {
  const dispatch = useDispatch<appDispatch>();
  const isFetchIds = useSelector((state: rootState) => state.items.isFetching.ids);
  const isFetchItem = useSelector((state: rootState) => state.items.isFetching.items);
  const isFetch = isFetchIds || isFetchItem;
  const onClick = () => dispatch(fetchIdsAll());
  return (
    <div>
      <div>Filters</div>
      <button disabled={isFetch} onClick={onClick}>
        reset
      </button>
      <Search />
      <Select />
      <Range />
    </div>
  );
}

export default PanelFilter;
