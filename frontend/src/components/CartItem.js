import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { AiFillDelete } from 'react-icons/ai'

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  removeFromCart() {
      let itemToRemove = this.props.item;
      this.props.removeFromCart(itemToRemove);
  }

  incrementQuantity() {
    let newQuantity = this.props.item.cartQuantity + 1;
    this.props.updateCartItem(this.props.item, newQuantity);
  }

  decrementQuantity() {
    let newQuantity = this.props.item.cartQuantity - 1;
    this.props.updateCartItem(this.props.item, newQuantity);
  }
  
  render() {
    return (
      <>
        <tr>
          <td>{this.props.idx}</td>
          <td>{this.props.item.food_name}</td>
          <td>${this.props.item.price}</td>
          {/* Hide controls when in checkout mode */}
          {(!this.props.checkoutMode) ? (
            <>
              <td>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button onClick={this.incrementQuantity} variant="outline-primary">+</Button>
                  </InputGroup.Prepend>
                  <FormControl value={this.props.item.cartQuantity} aria-describedby="basic-addon1" />
                  <InputGroup.Append>
                    <Button onClick={this.decrementQuantity} variant="outline-warning">-</Button>
                  </InputGroup.Append>
                </InputGroup>
              </td>
              <td>
                {(!this.props.checkoutMode) &&
                  <Button size="sm" onClick={this.removeFromCart} variant="danger"><AiFillDelete /></Button>
                }
              </td>
            </>
          ) : <>
                <td>{this.props.item.cartQuantity}</td>
                <td></td>
              </>
          }
        </tr>
      </>
    );
  }
}

export default CartItem;