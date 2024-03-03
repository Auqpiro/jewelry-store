import PanelFilter from "@components/Filter/Panel";
import PanelItems from "@components/Items/Panel";
import Pagination from "@components/Pagination";

/*
  redux thunk
  items
    init() > fetchIdsAll + fetchFields
    fetchIdsAll()
    loadCurrentPage()
  filter
    a: selectFilterType(filter: string)
    fetchIdsFilter()
  pagination
    a: changePage(page: number)
*/
function Main() {
  return (
    <div>
      <div>Main</div>
      <PanelFilter/>
      <Pagination />
      <PanelItems/>
      <Pagination />
    </div>
  );
}

export default Main;
