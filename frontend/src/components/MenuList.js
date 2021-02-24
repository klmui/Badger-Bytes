import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import MenuItem from './MenuItem';

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  getMenuCards(){
    // create Card for each menu,
    // then return a list of all Cards
    let menuCardList = [];
    for (const menu of this.props.menuItems) {
      menuCardList.push(<MenuItem className="col-sm-6" key={menu.id} menu={menu} />);
    }
    
    // This filler is used to prevent flexbox from 
    // centering the last row with only one element
    if (menuCardList.length % 2) {
      menuCardList.push(<MenuItem type="filler" />)
    }

    return menuCardList;
  }
  
  render() {
    return (
      <Row className="justify-content-center">
        {this.getMenuCards()}
      </Row>
    );
  }
}

export default MenuList;