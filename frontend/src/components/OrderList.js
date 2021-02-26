import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import OrderItem from './OrderItem';

class OrderList extends Component {
  constructor(props) {
    super(props);
  }

  getOrderCards(){
    // create a component for each order,
    // then return a list of all of them
    let orderItemList = [];
    for (const [idx, orderItem] of this.props.orderItems.entries()) {
      orderItemList.push(
          <OrderItem key={idx} orderItem={orderItem} />
      );
    }

    return orderItemList;
  }
  
  render() {
    return (
      <Row className="justify-content-center">
        {this.getOrderCards()}
      </Row>
    );
  }
}

export default OrderList;