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
import MenuService from "../services/menu.service";

const staffRoles = ["Admin", "Staff"];

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.showPrice = this.showPrice.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      editMode: false,
    }
  }

  componentDidMount() {
    if (this.props.type === "filler" ) {
      return;
    }

    if (this.props.addMode) {
      this.setState({
        ...this.props.menu,
        editMode: true
      })
    }

    this.setState({
      name: this.props.menu.food_name,
      description: this.props.menu.food_description,
      quantity: this.props.menu.quantity,
      image_src: this.props.menu.food_image,
      price: this.props.menu.price
    })
  }

  setName(name) {
    this.setState({
      name: name
    })
  }

  setDescription(description) {
    this.setState({
      description: description
    })
  }

  setQuantity(quantity) {
    this.setState({
      quantity: quantity
    })
  }

  setImageSrc(image_src) {
    this.setState({
      image_src: image_src
    })
  }

  setPrice(price) {
    this.setState({
      price: price
    })
  }

  showPrice() {
    // show price only if the item in stock
    if (this.state.quantity > 0) {
      return <p className="text-primary">${this.props.menu.price}</p>;
    } else {
      return <p className="text-danger">Sold out</p>;
    }
  }

  addToCart() {
    // TODO
    this.props.addToCart(this.props.menu);
  }

  addFood() {
    let menuObj = Object.assign({}, this.state)
    delete menuObj['editMode']

    MenuService
      .addFood(menuObj)
      .then((response) => {
        alert(response.foodId);
        this.props.history.push("/menu")
      })
  }

  deleteFood() {
    MenuService
      .deleteFood(this.props.menu.food_id)
      .then((response) => {
        alert(response.message);
        // TODO: refresh menu list
      })
  }

  updateFood() {
    let food = {
      id: this.props.menu.food_id,
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      image_src: this.state.image_src,
      price: this.state.price
    }

    MenuService
      .updateFood(food)
      .then((response) => {
        alert(response.message);
      })
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
        value={this.state.name}
        id="inputTitle"
        type="text"
        onChange={ e => this.setName(e.target.value)}
        placeholder="Name"
      />
    )
  }

  showEditablePrice() {
    return (
      <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        value={this.state.price} 
        aria-label="Price"
        onChange={ e => this.setPrice(e.target.value)}
      />
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
          value={this.state.description}
          onChange={ e => this.setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </>
    )
  }

  showDescription() {
    if (this.state.editMode) {
      return this.showEditableDescription()
    } else {
      return this.state.description
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
          {this.state.name}
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

    if (this.state.quantity > 0) {
      return (
        <Col xs={4} md={3}>
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
        <Button className="float-right" style={{marginLeft: "0.5rem"}} onClick={this.toggleEditMode.bind(this)} size="sm">
          <AiOutlineEdit />
        </Button>
      )
    }
  }

  showCancelEditButton() {
    if (this.state.editMode && !this.props.addMode){
      return (
        <Row className="mt-2">
          <Button onClick={this.toggleEditMode.bind(this)} block variant="outline-secondary">Cancel Editing</Button>
        </Row>
      )
    }
  }

  showBottomControls() {
    if (this.props.addMode) {
      return <Button onClick={this.addFood.bind(this)} block variant="primary">Add</Button>
    }

    if (this.state.editMode) {
      return (
        <>
          <Col>
            <Button onClick={this.updateFood.bind(this)} block variant="primary">Update</Button>
          </Col>
          <Col>
            <Button onClick={this.deleteFood.bind(this)} block variant="danger">Delete</Button>
          </Col>
        </>
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
              value={this.state.quantity}
              id="inputQuantity"
              type="number"
              onChange={e => this.setQuantity(e.target.value)}
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
          {this.state.editMode && (
            <Row>
              {this.showBottomControls()}
            </Row>
          )}
            {this.showCancelEditButton()}
        </Card.Body>
      </Card>
    );
  }
}

export default MenuItem;
