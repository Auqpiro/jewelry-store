import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Item from "@components/Items/Item";
import { rootState } from "@store/index";

function Items() {
  const items = useSelector((state: rootState) => state.items.items);
  return (
    <Row sm={1} md={2} lg={3} className="g-3">
      {items.length ?
        items.map((item) => (
          <Col key={item.id}>
            <Item item={item} />
          </Col>
        )) : <Container className="py-2 mt-3 text-center">Нет результатов</Container>}
    </Row>
  );
}

export default Items;
