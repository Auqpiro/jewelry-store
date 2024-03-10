import { Col, Container, Row } from "react-bootstrap";
import PanelFilter from "@components/Filter/Panel";
import PanelItems from "@components/Items/Panel";
import Pagination from "@components/Pagination";

function Main() {
  return (
    <Container className="mb-5">
      <Row>
        <Col lg={3} xl={3} xxl={2} className="d-none d-lg-block">
          <PanelFilter />
        </Col>
        <Col xs={12} lg={9} xl={9} xxl={10}>
          <Container className="d-none d-lg-block mb-3">
            <Pagination />
          </Container>
          <PanelItems />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
