import { Col, Row } from "react-bootstrap";
import PendingItem from "@components/Items/PendingItem";
import { ReactNode } from "react";

function PendingItems() {
  const arrayOfPending: ReactNode[] = Array.from({ length: 50 });
  return (
    <Row sm={1} md={3} className="g-3">
      {arrayOfPending &&
        arrayOfPending.map((_, ind) => (
          <Col key={ind}>
            <PendingItem key={ind} />
          </Col>
        ))}
    </Row>
  );
}

export default PendingItems;
