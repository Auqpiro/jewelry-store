import { Good } from "@store/slices/items";

interface IItem {
  item: Good;
}
function Item({ item }: IItem) {
  return <div>{item.product}</div>;
}

export default Item;
