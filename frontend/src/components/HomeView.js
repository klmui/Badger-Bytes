import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'


class HomeView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Container>
        <h1 className="view-header text-center mb-3">Welcome to {this.props.restaurant_name}!</h1>
        <Row className="justify-content-between align-items-center">
          <Col>
            <p className="text-right">
              {this.props.restaurant_description}
            </p>
          </Col>
          <Col>
            <Image src={this.props.restaurant_image} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeView;