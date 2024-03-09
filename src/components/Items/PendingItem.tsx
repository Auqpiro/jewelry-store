import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const gen = (min: number, max: number): number => Math.round(min + Math.random() * (max + 1 - min));

function PendingItem() {
  return (
    <Card>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={gen(3, 3)} />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="glow" className="text-muted">
          <Placeholder xs={gen(10, 10)} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          {Array.from({ length: gen(4, 6) }).map((_, ind) => (
            <React.Fragment key={ind}>
              <Placeholder xs={gen(1, 5)} />
              {"\t"}
            </React.Fragment>
          ))}
          <Placeholder xs={1} />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="glow" className="text-muted">
          <Placeholder xs={gen(1, 1)} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default PendingItem;
