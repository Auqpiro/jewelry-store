import PanelFilter from "@components/Filter/Panel";
import PanelItems from "@components/Items/Panel";
import Pagination from "@components/Pagination";

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
