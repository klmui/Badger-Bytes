import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
  }

  handlePaymentMethod(event) {
    this.props.setPaymentMethod(event.target.value);
  }
  
  render() {
    return (
      <>
        <h4>Payment Method</h4>
        <Form>
          <Form.Group>
            <Form.Control
              as="select"
              value={this.props.paymentMethod}
              onChange={this.handlePaymentMethod.bind(this)}
              custom>
              <option value="APPLE_PAY">Apple Pay</option>
              <option value="STRIPE">Stripe</option>
              <option value="PAYPAL">PayPal</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default PaymentInfo;