import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import OrderService from '../services/order.service'
import ReceiptList from './ReceiptList'

class ReceiptView extends Component {
  constructor(props) {
    super(props);
    this.state ={
      orderItems: [],
      //TODO: dummy user for testing
      user: {
        "username": "buckyupdate",
        "type": "Staff" // change this to check whether it works for both customers and admins
      }
    }
  }
  
  componentDidMount() {
    //TODO: change this.state.user to actual user info
    if (this.state.user.type === undefined) {
      return;
    }

    if (this.userIsStaff()){
      this.fetchAllOrderList();
    } else {
      this.fetchUserOrderList();
    }
  }

  userIsStaff() {
    return this.state.user.type !== "Customer"
  }

  // apologies for the messy code...
  organizeOrderJson(ordersJson) {
    let orderIds = new Set()
    let orderItems = []

    // first get all orderIds
    ordersJson.forEach((order) => {
      orderIds.add(order.order_id);
    })

    orderIds.forEach((orderId) => {
      let newOrderObj = {}
      let orderObjs = ordersJson.filter((order) => {
        return order.order_id == orderId;
      })
      newOrderObj = Object.assign({}, orderObjs[0]);

      // remove unnecessary fields and initialize `foods` field
      delete newOrderObj.food_id;
      delete newOrderObj.food_name;
      delete newOrderObj.quantity_served;
      delete newOrderObj.unit_price;
      newOrderObj.foods = []

      // merge foods into one order object
      orderObjs.forEach((orderObj) => {
        newOrderObj.foods.push({
          food_id: orderObj.food_id,
          food_name: orderObj.food_name,
          cartQuantity: orderObj.quantity_served, // to be reused in <CartItem>
          price: orderObj.quantity_served, // to be used in <CartItem>
        })
      })

      orderItems.push(newOrderObj)
    })

    return orderItems;
  }

  fetchAllOrderList() {
    OrderService
      .getAllOrders()
      .then((response) => {
        let organizedJson = this.organizeOrderJson(response)
        this.setState({
          orderItems: organizedJson
        })
      })
  }

  fetchUserOrderList() {
    OrderService
      .getUserOrders(this.state.user.username) //TODO: pass user info from <App> and change to this.props.~~
      .then((response) => {
        let organizedJson = this.organizeOrderJson(response)
        this.setState({
          orderItems: organizedJson
        })
      })
  }

  showHeader() {
    return "Your Receipt"
  }

  render() {
    return (
      <Container>
        <h1 className="view-header">{this.showHeader()}</h1>
         <ReceiptList
          orderItems={this.state.orderItems} 
          userIsStaff={this.userIsStaff.bind(this)}/>
      </Container>
    );
  }
}

export default ReceiptView;