import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import MenuList from './MenuList';

class MenuView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
      <Container>
        <h1 className="view-header">Menu</h1>
        <MenuList menuItems={this.props.menuItems} addToCart={this.props.addToCart} />
      </Container>
      </>
    );
  }
}

export default MenuView;