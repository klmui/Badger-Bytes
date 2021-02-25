import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import TimePicker from 'react-bootstrap-time-picker';

class PickupInfo extends Component {
  constructor(props) {
    super(props);
  }

  // handler for TimePicker
  handleTimeChange(time) {
    this.props.setTime(time);
  }

  handleCarDescription(event) {
    this.props.setCarDescription(event.target.value);
  }
  
  render() {
    return (
      <>
        <h4>Pickup Information</h4>
        <Form>
          <Form.Group controlId="formPickupTime">
            <Form.Label>Pickup Time</Form.Label>
            {/* Show times starting from 10am to 9pm by every 30 minutes */}
            <TimePicker 
              onChange={this.handleTimeChange.bind(this)} 
              value={this.props.time} 
              start="10:00" 
              end="21:00" 
              step={30} />
          </Form.Group>
          <Form.Group controlId="formCarDescription">
            <Form.Label>Car Description</Form.Label>
            <Form.Control
              type="text"
              name="carDescription"
              placeholder="Navy Dodge #A1B2C3" 
              value={this.props.carDescription}
              onChange={this.handleCarDescription.bind(this)}
            />
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default PickupInfo;