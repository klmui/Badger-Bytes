import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import MenuService from "../services/menu.service";
import MenuList from "./MenuList";

class MenuView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchMenuList();
  }

  fetchMenuList() {
    MenuService.getList().then((response) => {
      this.setState({
        menuItems: response,
      });
    });
  }

  render() {
    return (
      <>
        <Container>
          <h1 className="view-header">Welcome to Menu Page!</h1>
          <MenuList
            menuItems={this.props.menuItems}
            addToCart={this.props.addToCart}
            profile={this.props.profile}
          />
        </Container>
      </>
    );
  }
}

export default MenuView;
