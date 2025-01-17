import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  getCartItems(){
    // create Card for each menu,
    // then return a list of all Cards
    let cartItemList = [];
    for (const [idx, item] of this.props.cartItems.entries()) {
      cartItemList.push(
        <CartItem key={item.food_name}
                  idx={idx+1} 
                  item={item} 
                  removeFromCart={this.props.removeFromCart} 
                  updateCartItem={this.props.updateCartItem} 
                  checkoutMode={this.props.checkoutMode}
                  />
      );
    }

    return cartItemList;
  }

  getTotal() {
    return this.props.cartItems.reduce((sum, i) => {
      return sum + (i.price * i.cartQuantity)
    }, 0)
  }
  
  render() {
     return (
      <Row className="justify-content-center">
        { (this.props.cartItems !== undefined && this.props.cartItems.length != 0) ? (
          <>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{}}>Menu</th>
                  <th style={{}}>Price</th>
                  <th className="quantityCol">Quantity</th>
                  <th ></th>
                </tr>
              </thead>
              <tbody>
                {this.getCartItems()}
              </tbody>
            </Table>
            {!this.props.checkoutMode && (
              <Link to={{
                pathname: '/checkout',
                state: { 
                  cartItems: this.props.cartItems, 
                  profile: this.props.profile,
                  username: this.props.username,
                }
              }}>
                <Button size="lg" variant="outline-primary">Go to checkout · ${this.getTotal()}</Button>
              </Link>
            )}
          </>
        ) : (
          <h3>No items</h3>
        )}
      </Row>
    );
  }
}

export default Cart;