import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import Cart from './Cart';
import PickupInfo from './PickupInfo';
import PaymentInfo from './PaymentInfo';
import OrderService from '../services/order.service'

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      time: 36000, // 10am
      carDescription: '',
      cartItems: [],
      username: '',
      paymentMethod: 'APPLE_PAY' // TODO: should default to user's preferred payment method
    }
  }

  componentDidMount() {
    const { cartItems, profile, username } = this.props.location.state;
    this.setState({
      cartItems: cartItems,
      carDescription: profile.carDescription,
      username: username,
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
    let foods = [...this.state.cartItems];

    foods.forEach((food) => {
      food.foodId = food.food_id; // @Frontend: please keep the naming coherent (food_id vs foodId)
      food.newQuantity = food.quantity - food.cartQuantity;
      food.served = food.cartQuantity
    })

    let orderForm = {
      username: this.state.username,
      carDescription: this.state.carDescription,
      paymentType: this.state.paymentMethod,
      orderDateTime: new Date().toISOString(),
      pickupDateTime: this.convertTimeToISO(),
      foods: foods,
    }
    
    OrderService
      .placeOrder(orderForm)
      .then((response) => {
        alert(response.message)
      })
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