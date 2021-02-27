import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import MenuItem from './MenuItem';

class MenuAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        description: "",
        quantity: 1,
        image_src: "",
        price: 5,
      }
  }

  componentDidMount() {
    // validate user role

    // check for invalid access
    if (!this.props.location.state) {
      this.props.history.push('/menu');
      return; 
    }

    // check for role
    if (this.props.location.state.profile){
      if (this.props.location.state.profile.type === "Customer") {
        this.props.history.push('/menu');
      }
    } else {
      this.props.history.push('/menu');
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <h1 className="view-header">Add a new food</h1>
        </Row>
        <Row className="justify-content-center">
          <MenuItem history={this.props.history} menu={this.state} addMode/>
        </Row>
      </Container>
    );
  }
}

export default MenuAddView;