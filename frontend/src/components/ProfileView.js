import React, { Component } from 'react';
import {Col, Form, Button, Container } from 'react-bootstrap';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      address:"",
      city:"",
      state:"",
      zip:"",
      car_desription:"",
      type:"",
      email:""
    }
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const user = {
      "username": this.state.username,
      "password": this.state.password,
      "phone_number": this.state.phoneNumber,
      "address": this.state.address,
      "city": this.state.city,
      "state": this.state.state,
      "zip": this.state.zip,
      "car_description": this.state.car_description,
      "type": this.state.type,
      "email": this.state.email
    }
    if(this.props.token && this.state.password.length){
      this.props.editProfile(user);
    }
  }
  
  render() {
    return (
      <Container>
          <h1>Edit Your Account</h1>
        <Form>
          <Form.Row >
            <Form.Group as={Col} controlId="formGridEmail" style={{paddingTop:"10px",paddingLeft:"20px"}}>
              <Form.Label>Username</Form.Label>
              <Form.Control type={"text"} placeholder={this.props.username} value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword" style={{paddingTop:"10px", paddingLeft:"10px", paddingRight:"20px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type={"password"} placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1"  style={{paddingLeft:"20px", paddingRight:"20px"}}>
            <Form.Label>Address</Form.Label>
            <Form.Control type={"text"} placeholder="1234 Main St" value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>
          </Form.Group>
          </Form.Row>
            
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCarDesc" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <Form.Label>Car Description</Form.Label>
                <Form.Control type={"text"} value={this.state.car_desription} onChange={e => this.setState({car_description: e.target.value})} />
              </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formControlsEmail" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type={"email"} value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
              </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity" style={{paddingLeft:"20px"}}>
              <Form.Label>City</Form.Label>
              <Form.Control type={"text"} value={this.state.city} onChange={e => this.setState({city: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control type={"text"} value={this.state.state} onChange={e => this.setState({state: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip" style={{paddingRight:"20px"}}>
              <Form.Label>Zip</Form.Label>
              <Form.Control type={"number"} value={this.zip} onChange={e => this.setState({zip: e.target.value})}/>
            </Form.Group>
          </Form.Row>
        
        <Form.Row>
          <Form.Group as={Col} controlId="formGridType"style={{paddingLeft:"20px", paddingRight:"20px"}} >
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" value={this.state.type} onChange={e => this.setState({type: e.target.value})}>
                  <option>Choose</option>
                  <option>Customer</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </Form.Control>
            </Form.Group>
        </Form.Row>
          
          <Button variant="primary" style={{marginLeft:"20px"}} onClick={this.submitForm}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ProfileView;