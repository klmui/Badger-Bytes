import React, { Component } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-between align-items-top">
            <Col>
                <h1 className="view-header">Usage Reports</h1>
            </Col>
            <Col>
                <h1 className="view-header">Results</h1>
            </Col>
        </Row>
        <Row className="justify-content-between align-items-top">
            <Col>
            <Form>
            <Form.Group>
                <Form.Label>Begin Date</Form.Label>
                <Form.Control type="date" placeholder="02/20/2021" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" placeholder="02/20/2029" />
            </Form.Group>
            <Button block variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            </Col>
            <Col className="ml-3">
            fsfs
            </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginView;