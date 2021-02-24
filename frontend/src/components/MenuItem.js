import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AiOutlinePlus } from "react-icons/ai";

import '../App.css';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.showPrice = this.showPrice.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  showPrice() {
    // show price only if the item in stock
    if (this.props.menu.quantity) {
      return <p className="text-primary">${this.props.menu.price}</p>
    } else {
      return <p className="text-danger">Sold out</p>
    }
  }

  addToCart() {
    // TODO
    alert("TODO: Should add " + this.props.menu.name + " to cart!")
  }
  
  render() {
    if (this.props.type==="filler") {
      return <Card className="filler menu-item" />
    }
    return (
      <Card className="menu-item">
        <Card.Body>
          <Card.Title>
              <Row className="justify-content-between align-center align-items-top">
                <Col xs={10}>{this.props.menu.name}{this.showPrice()}</Col>
                {/* Show add to cart button only when item is in stock */}
                <Col xs={2}> {(this.props.menu.quantity > 0) && <Button onClick={this.addToCart} size="sm"><AiOutlinePlus /></Button> }</Col>
              </Row>
          </Card.Title>
          <Card.Text>
            <Row className="justify-content-between align-center">
              <Col>{this.props.menu.description}</Col>
              <Col><Image fluid src={this.props.menu.image_src} /></Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuItem;