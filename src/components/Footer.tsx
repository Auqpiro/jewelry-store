import React, { useState } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import Pagination from "@components/Pagination";
import PanelFilter from "@components/Filter/Panel";

function Footer() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <PanelFilter />
        </Offcanvas.Body>
        <Offcanvas.Header closeButton></Offcanvas.Header>
      </Offcanvas>
      <Container>
        <Row>
          <Col>
            <Button type="button" variant="outline-primary" className="float-end" onClick={handleShow}>
              <svg width="20" height="20" viewBox="0 0 30 30" aria-hidden="true">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="3"
                  d="M4 7h22M4 15h22M4 23h22"
                ></path>
              </svg>
            </Button>
            <div className="ms-5">
              <Pagination />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Footer;
