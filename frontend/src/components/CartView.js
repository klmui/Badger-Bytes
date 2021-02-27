import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import Cart from './Cart';

class CartView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
      <Container>
        <h1 className="view-header">Your Cart</h1>
        <Cart cartItems={this.props.cartItems} 
              username={this.props.username}
              updateCartItem={this.props.updateCartItem}
              removeFromCart={this.props.removeFromCart}
              profile={this.props.profile}
        />
      </Container>
      </>
    );
  }
}

export default CartView;