import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

import "../App.css";

const staffRoles = ["Admin", "Staff"];

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.showPrice = this.showPrice.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      editMode: false
    }
  }

  showPrice() {
    // show price only if the item in stock
    if (this.props.menu.quantity > 0) {
      return <p className="text-primary">${this.props.menu.price}</p>;
    } else {
      return <p className="text-danger">Sold out</p>;
    }
  }

  addToCart() {
    // TODO
    this.props.addToCart(this.props.menu);
  }

  userIsStaff() {
    if (!this.props.profile) {
      return false;
    }

    return staffRoles.includes(this.props.profile.type);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  showEditableTitle() {
    return (
      <Form.Control
        value={this.props.menu.food_name}
        id="inputTitle"
        type="text"
      />
    )
  }

  showEditablePrice() {
    return (
      <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl value={this.props.menu.price} aria-label="Price" />
    </InputGroup>
  
    )
  }

  showEditableDescription() {
    return (
      <>
        <Form.Label>Description</Form.Label>
        <Form.Control
          id="inputDescription"
          type="textbox"
          value={this.props.menu.food_description}
        />
      </>
    )
  }

  showDescription() {
    if (this.state.editMode) {
      return this.showEditableDescription()
    } else {
      return this.props.menu.food_description
    }
  }


  showLeftControls() {
    if (this.state.editMode) {
      return (
        <Col>
          {this.showEditableTitle()}
          {this.showEditablePrice()}
        </Col>
      )
    } else {
      return (
        <Col>
          {this.props.menu.food_name}
          {this.showPrice()}
      </Col>
      )
    }
  }

  // For user: show Add to Cart button
  // For staff/admin: show stock update form
  showRightControls() {
    if (this.state.editMode) {
      return this.showEditableQuantity();
    }

    if (this.props.menu.quantity > 0) {
      return (
        <Col xs={3}>
          {this.buttonAddToCart()}
          {/* Only visible to staff/admins */}
          {this.buttonToggleEditMode()}
        </Col>
      )
    }
  }

  buttonAddToCart = () => {
    return (
      <Button onClick={this.addToCart} size="sm">
        <AiOutlinePlus />
      </Button>
    )
  }

  buttonToggleEditMode = () => {
    if (this.userIsStaff()){
      return (
        <Button style={{marginLeft: "0.5rem"}} onClick={this.toggleEditMode.bind(this)} size="sm">
          <AiOutlineEdit />
        </Button>
      )
    }
  }

  showCancelEditButton() {
    if (this.state.editMode){
      return (
        <Row className="mt-2">
          <Button onClick={this.toggleEditMode.bind(this)} block variant="outline-secondary">Cancel Editing</Button>
        </Row>
      )
    }
  }

  showEditableQuantity() {
    if (this.state.editMode) {
      return (
        <Col xs={6} className="justify-content-between align-items-center">
            <Card.Subtitle>
              Quantity in Stock
            </Card.Subtitle>
            <Form.Control
              id="inputQuantity"
              type="number"
            />
        </Col>
     )
    }
  }

  render() {
    if (this.props.type === "filler") {
      return <Card className="filler menu-item" />;
    }
    return (
      <Card className="menu-item">
        <Card.Body>
          <Card.Title>
            <Row className="justify-content-between align-items-center">
              <Col>
                {this.showLeftControls()}
              </Col>
              {/* Show add to cart button only when item is in stock */}
                {this.showRightControls()}
            </Row>
          </Card.Title>
          <Card.Text>
            <Row className="justify-content-between align-center">
              <Col>{this.showDescription()}</Col>
              <Col>
                <Image fluid src={this.props.menu.food_image} />
              </Col>
            </Row>
          </Card.Text>
          <Row>
            <Col>
              <Button block variant="primary">Update</Button>
            </Col>
            <Col>
              <Button block variant="danger">Delete</Button>
            </Col>
          </Row>
            {this.showCancelEditButton()}
        </Card.Body>
      </Card>
    );
  }
}

export default MenuItem;
