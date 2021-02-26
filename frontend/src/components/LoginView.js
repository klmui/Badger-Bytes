import React, { Component } from 'react';
import {Col, Form, Button, Container } from 'react-bootstrap';
import '../css/LoginView.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const user = {
      "username": this.state.username,
      "password": this.state.password,
    }
    this.props.login(user);
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Row >
            <Form.Group as={Col} controlId="formGridEmail" style={{paddingTop:"70px",paddingLeft:"30px"}}>
              <Form.Label>Username</Form.Label>
              <Form.Control type={"text"} placeholder="username" value={this.state.username} style={{width:"150px"}} onChange={e => this.setState({username: e.target.value})}/>
            </Form.Group>
          </Form.Row >
          <Form.Row >
            <Form.Group as={Col} controlId="formGridPassword" style={{paddingTop:"10px", paddingLeft:"30px", paddingRight:"20px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type={"password"} placeholder="password" value={this.state.password} style={{width:"150px"}} onChange={e => this.setState({password: e.target.value})}/>
            </Form.Group>
          </Form.Row>
          <Button variant="dark" style={{marginLeft:"30px"}} onClick={this.submitForm}>
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}



export default LoginView;
