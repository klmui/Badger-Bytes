import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import Cart from './Cart';
import PickupInfo from './PickupInfo';
import PaymentInfo from './PaymentInfo';

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cartItems: [],
      time: 36000, // 10am
      carDescription: '',
      paymentMethod: 'APPLE_PAY' // TODO: should default to user's preferred payment method
    }
  }

  componentDidMount() {
    const { cartItems } = this.props.location.state;
    this.setState({
      cartItems: cartItems
    })
  }

  setCarDescription(carDescription) {
    this.setState(
      { carDescription }
    )
  }
  
  setTime(time) {
    this.setState(
      { time }
    )
  }

  setPaymentMethod(paymentMethod) {
    this.setState(
      { paymentMethod }
    )
  }

  convertTimeToISO() {
    let datetime = new Date();
    datetime.setHours(0, 0, this.state.time, 0);
    return datetime.toISOString();
  }

  submitOrder(){
    // TODO: actually post to /order
    
    alert("TODO: pickuptime: " + this.convertTimeToISO() + ' car: ' + this.state.carDescription + ' payment: ' + this.state.paymentMethod)
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
        <Container>
          <h1 className="view-header">Checkout</h1>
          <Cart checkoutMode cartItems={this.state.cartItems} />
          <hr />
          <PickupInfo
            carDescription={this.state.carDescription}
            time={this.state.time}  
            setCarDescription={this.setCarDescription.bind(this)}
            setTime={this.setTime.bind(this)}
          />
          <hr />
          <PaymentInfo
            paymentMethod={this.state.paymentMethod}
            setPaymentMethod={this.setPaymentMethod.bind(this)}
          />
          <Row className="justify-content-around">
            <Button onClick={this.submitOrder.bind(this)} size="lg" variant="primary">Place an order</Button>
            <Button onClick={this.goBack.bind(this)} size="lg" variant="secondary">Cancel</Button>
          </Row>

        </Container>
    );
  }
}

export default CheckoutView;