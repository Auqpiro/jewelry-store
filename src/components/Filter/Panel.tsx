import Search from "@components/Filter/Search";
import Select from "@components/Filter/Select";
import Range from "@components/Filter/Range";

function PanelFilter() {
  return (
    <div>
      <div>Filters</div>
      <Search/>
      <Select/>
      <Range/>
    </div>
  );
}

export default PanelFilter;
