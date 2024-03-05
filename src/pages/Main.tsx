import { Col, Container, Row } from "react-bootstrap";
import PanelFilter from "@components/Filter/Panel";
import PanelItems from "@components/Items/Panel";
import Pagination from "@components/Pagination";

function Main() {
  return (
    <main>
      <Container>
        <Row>
          <Col xs={3}>
            <PanelFilter />
          </Col>
          <Col xs={9}>
            <Pagination />
            <PanelItems />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Main;
