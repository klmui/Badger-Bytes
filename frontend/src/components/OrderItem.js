import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AiOutlinePlus } from "react-icons/ai";
import { jsPDF } from 'jspdf';

import Cart from './Cart';
import '../App.css';

class OrderItem extends Component {
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

  showOrderCompleteButton() {
    if (!this.props.userIsStaff()) {
      return;
    }
    if (this.props.orderItem.completed) {
      return (
        <Button disabled block variant="secondary">Completed</Button>
      )
    } else {
      return (
        <Button block variant="danger">Complete Order</Button>
      )
    }
  }

  generateReceipt = () =>{

    var foods = this.props.orderItem.foods
    var doc = new jsPDF();
    
    //is used to print a new line 

    var y = 40
    var orderNum = this.props.orderItem.order_id
    var total = 0

    doc.text("Receipt for Order #" +  orderNum , 10, 10)
    doc.text("Date: " + this.showDate(), 10, 20 )
    doc.text("Username: " + this.props.profile.username,10,30)

    for(var i = 0; i < foods.length; ++i){
      var price = foods[i].cartQuantity * foods[i].price 
      total = total + price
      var string = "Name: " + foods[i].food_name + ", Quantity: " + foods[i].cartQuantity + ", Price: $" + foods[i].price
      doc.text(string,10,y)
      y+=10
    }

    doc.text("Total: $" + total, 10, y);

    doc.save('receipt' + orderNum + ".pdf")


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
                <Cart cartItems={this.props.orderItem.foods} checkoutMode />
                {/* <Col xs={2}> {(this.props.or.quantity > 0) && <Button onClick={this.addToCart} size="sm"><AiOutlinePlus /></Button> }</Col> */}
              </Row>
          </Card.Title>
          <Card.Text>
            <Row className="justify-content-between align-center">
              <Col>
                <Button block variant="light" disabled>Pickup Time</Button>
                <Button block variant="outline-primary" disabled>{this.showTime()}</Button>
              </Col>
              <Col>
              <Button block variant="light" disabled>Car Description</Button>
                <Button block variant="outline-primary" disabled>{this.props.profile.carDescription}</Button>
              </Col>
            </Row>
              <Row style={{marginTop: "1rem"}} className="justify-content-between align-center">
                  <Button block variant="success">Print Receipt</Button>
                  {/* Show controls only to staffs */}
                  {this.showOrderCompleteButton()}
              </Row>
              <Row style={{marginTop: "1rem"}} className="justify-content-between align-center">
                  <Button block variant="primary" onClick={this.generateReceipt}>Print Receipt</Button>
              </Row>
            
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default OrderItem;