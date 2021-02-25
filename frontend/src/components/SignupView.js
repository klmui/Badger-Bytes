import React, { Component } from 'react';
import {Col, Form, Button, Container } from 'react-bootstrap';

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      address:"",
      city:"",
      state:"",
      zip:"",
      car_desription:"",
      type:"",
      email:""
    }
  }
  
  render() {
    return (
      <Container>
        <Form>
          <Form.Row >
            <Form.Group as={Col} controlId="formGridEmail" style={{paddingTop:"10px",paddingLeft:"20px"}}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword" style={{paddingTop:"10px", paddingLeft:"10px", paddingRight:"20px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1"  style={{paddingLeft:"20px", paddingRight:"20px"}}>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>
          </Form.Group>
          </Form.Row>
          
            
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCarDesc" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <Form.Label>Car Description</Form.Label>
                <Form.Control type="car_description" value={this.state.car_desription} onChange={e => this.setState({car_desription: e.target.value})} />
              </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formControlsEmail" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
              </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity" style={{paddingLeft:"20px"}}>
              <Form.Label>City</Form.Label>
              <Form.Control type="city" value={this.state.city} onChange={e => this.setState({city: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control type="state"value={this.state.state} onChange={e => this.setState({state: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip" style={{paddingRight:"20px"}}>
              <Form.Label>Zip</Form.Label>
              <Form.Control type={"number"} value={this.zip} onChange={e => this.setState({zip: e.target.value})}/>
            </Form.Group>
          </Form.Row>
        
        <Form.Row>
          <Form.Group as={Col} controlId="formGridType"style={{paddingLeft:"20px", paddingRight:"20px"}} >
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." value={this.state.type} onChange={e => this.setState({type: e.target.value})}>
                  <option>Choose</option>
                  <option>Customer</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </Form.Control>
            </Form.Group>
        </Form.Row>
          
          <Button variant="primary" type="submit" style={{marginLeft:"20px"}}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignupView;