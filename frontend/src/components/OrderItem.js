import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AiOutlinePlus } from "react-icons/ai";

import Cart from './Cart';
import '../App.css';

class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className="col-md-8">
        <Card.Body>
          <Card.Title>
              <Row>Order #{this.props.orderItem.order_id}</Row>
              <Row className="justify-content-center align-center align-items-top">
                <Cart cartItems={this.props.orderItem.foods} checkoutMode />
                {/* <Col xs={2}> {(this.props.or.quantity > 0) && <Button onClick={this.addToCart} size="sm"><AiOutlinePlus /></Button> }</Col> */}
              </Row>
          </Card.Title>
          <Card.Text>
            <Row className="justify-content-between align-center">
              <Col>
                <Button block variant="light" disabled>Pickup Time</Button>
                <Button block variant="outline-primary" disabled>{this.props.orderItem.pickup_date_time}</Button>
              </Col>
              <Col>
                <Button block variant="success">Print Order</Button>
                <Button block variant="danger">Complete Order</Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default OrderItem;