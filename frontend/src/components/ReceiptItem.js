import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AiOutlinePlus } from "react-icons/ai";

import Cart from './Cart';
import '../App.css';

class ReceiptItem extends Component {
  constructor(props) {
    super(props);
  }

  // converts Date ISO String to human readable time
  showTime() {
    return new Date(
        this.props.orderItem.pickup_date_time
      ).toLocaleTimeString(
          // omit seconds
          navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
      });
  }

  // converts Date ISO String to human readable date
  showDate() {
    return new Date(
        this.props.orderItem.pickup_date_time
      ).toLocaleDateString()
  }

  render() {
    return (
      <Card className="col-md-8">
        <Card.Body>
          <Card.Title>
              <Row className="justify-content-between">
                <Col>
                  Order #{this.props.orderItem.order_id}
                </Col>
                <Col className="text-right">
                  {this.showDate()}
                </Col>
              </Row>
              <Row className="justify-content-center align-center align-items-top">
                <Cart cartItems={this.props.orderItem.foods} checkoutMode={true} />
                {/* <Col xs={2}> {(this.props.or.quantity > 0) && <Button onClick={this.addToCart} size="sm"><AiOutlinePlus /></Button> }</Col> */}
              </Row>
          </Card.Title>
          <Card.Text>
            <Row className="justify-content-between align-center">
              <Col>
                <Button block variant="light" disabled>Print PDF</Button>
                <Button block variant="outline-primary" disabled>{this.showTime()}</Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ReceiptItem;