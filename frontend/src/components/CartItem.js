import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart() {
      let itemToRemove = this.props.item;
      this.props.removeFromCart(itemToRemove);
  }
  
  render() {
    return (
      <>
        <tr>
          <td>{this.props.idx}</td>
          <td>{this.props.item.food_name}</td>
          <td>${this.props.item.price}</td>
          <td>{this.props.item.cartQuantity}</td>
          <td><Button onClick={this.removeFromCart} variant="danger">Remove</Button></td>
        </tr>
      </>
    );
  }
}

export default CartItem;