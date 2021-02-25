import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import MenuService from '../services/menu.service'
import MenuList from './MenuList';

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    }
  }

  componentDidMount() {
    this.fetchMenuList();
  }

  fetchMenuList() {
    MenuService
      .getList()
      .then((response) => {
        this.setState({
          menuItems: response
        })
      })
  }
  
  render() {
    return (
      <>
      <Container>
        <h1 className="view-header">Menu</h1>
        <MenuList menuItems={this.state.menuItems} />
      </Container>
      </>
    );
  }
}

export default MenuView;