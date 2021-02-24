import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {LinkContainer} from 'react-router-bootstrap'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Welcome to the Welcome Page!'};
  }
  
  render() {
    if(this.props.token){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >
                {/* <img
                  alt=""
                  src="/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '} */}
                Badger Bytes
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else{
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >
                {/* <img
                  alt=""
                  src="/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '} */}
                Badger Bytes
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/menu">
                  <Nav.Link>Menu</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>          
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }  
  }
}

export default Navigation;