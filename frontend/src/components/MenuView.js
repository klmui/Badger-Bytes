import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import MenuService from "../services/menu.service";
import MenuList from "./MenuList";

const staffRoles = ["Admin", "Staff"];

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

  showAddFoodButton() {
    if (this.props.profile === null) {
      return;
    }

    // show add food button only to staffs/admins
    if (staffRoles.includes(this.props.profile.type)) {
      return (
        <Col>
          <Link to={{
            pathname: '/menu/add',
            state: { 
              profile: this.props.profile
            }
          }}>
            <Button className="float-right" size="md">Add Food</Button>
          </Link>
        </Col>
      )
    }
  }

  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col>
              <h1 className="view-header">Menu</h1>
            </Col>
            {this.showAddFoodButton()}
          </Row>
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
