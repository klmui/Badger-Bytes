import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {LinkContainer} from 'react-router-bootstrap'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Welcome to the Welcome Page!'};
  }
  
  render() {
    return (
      <>
      <Navbar bg="primary" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand >
            {/* <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} */}
            Scavenge
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/menu">
            <Nav.Link>Menu</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/cart">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/orders">
            <Nav.Link>My Orders</Nav.Link>
          </LinkContainer>          
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>

      <Navbar fixed="bottom" />
      </>
    );
  }
}

export default Navigation;