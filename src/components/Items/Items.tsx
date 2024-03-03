import { useSelector } from "react-redux";
import Item from "@components/Items/Item";
import { rootState } from "@store/index";

function Items() {
  const items = useSelector((state: rootState) => state.items.items);
  return <div>{items.length && items.map((item) => <Item key={item.id} item={item} />)}</div>;
}

export default Items;
