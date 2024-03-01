import { rootState } from "@store/index";
import { useSelector } from "react-redux";

function Range() {
  const first = useSelector((state: rootState) => {
    const { price } = state.filter.options;
    const [first = 0] = price;
    return first;
  });
  const last = useSelector((state: rootState) => {
    const { price } = state.filter.options;
    const last = price.at(-1) || 0;
    return last;
  });
  return (
    <div>
      Range {first}-{last}
    </div>
  );
}

export default Range;
