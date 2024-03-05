import { Card } from "react-bootstrap";
import { Good } from "@store/slices/items";

interface IItem {
  item: Good;
}
function Item({ item }: IItem) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.brand ? item.brand : "BRAND"}</Card.Title>
        <Card.Subtitle className="text-muted">id: {item.id}</Card.Subtitle>
        <Card.Text>{item.product}</Card.Text>
        <Card.Subtitle className="text-muted">{item.price}р.</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default Item;
