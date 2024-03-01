import { rootState } from "@store/index";
import { useSelector } from "react-redux";

function Select() {
  const countOptions = useSelector((state: rootState) => {
    const { brand } = state.filter.options;
    return brand.length;
  });
  return <div>Select ({countOptions})</div>;
}

export default Select;
