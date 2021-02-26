import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import ReceiptItem from './ReceiptItem';

class ReceiptList extends Component {
  constructor(props) {
    super(props);
  }

  getOrderCards(){
    // create a component for each order,
    // then return a list of all of them
    let orderItemList = [];
    for (const [idx, orderItem] of this.props.orderItems.entries()) {
      orderItemList.push(
          <ReceiptItem 
            key={idx} 
            orderItem={orderItem} 
            userIsStaff={this.props.userIsStaff} />
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

export default ReceiptList;