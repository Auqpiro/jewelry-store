import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@store/index";
import { fetchIdsAll } from "@store/slices/items";
import { selectFilterType } from "@store/slices/filter";
import Search from "@components/Filter/Search";
import Select from "@components/Filter/Select";
import Range from "@components/Filter/Range";

function PanelFilter() {
  const dispatch = useDispatch<appDispatch>();

  const onClick = () => {
    dispatch(selectFilterType(null));
    dispatch(fetchIdsAll());
  };

  const type = useSelector((state: rootState) => state.filter.type);
  const isFetch = useSelector((state: rootState) => {
    const { items, ids } = state.items.isFetching;
    return items || ids;
  });
  
  return (
    <div>
      <div>Filters</div>
      <button disabled={isFetch || !type} onClick={onClick}>
        reset
      </button>
      <Search />
      <Select />
      <Range />
    </div>
  );
}

export default PanelFilter;
