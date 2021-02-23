import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import MenuList from './MenuList';

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dummy until the API is out
      menuItems: [ {foodName: "Crispy Chicken Wings",
                    description: "Choice of buffalo, spicy Asian, maple-chipotle, BBQ, honey-harissa, Memphis dry rub or parmesan peppercorn, with celery & housemade blue cheese dressing",
                    price: 8.00,
                    img_src: "https://via.placeholder.com/500x325",
                    quantity: 4},
                    {foodName: "Fried Cheese Curds",
                    description: "Spotted Cow-battered cheese curds, served with ranch dressing",
                    price: 9.00,
                    img_src: "https://via.placeholder.com/500x325",
                    quantity: 4},
                    {foodName: "Hot Soft Pretzels",
                    description: "Two fresh baked pretzels with whole grain mustard & jack cheese sauce",
                    price: 8.00,
                    img_src: "https://via.placeholder.com/500x325",
                    quantity: 0}
                  ]
    }
  }
  
  render() {
    return (
      <>
      <Container>
        <h1 className="view-header">Menu</h1>
        <MenuList menuItems={this.state.menuItems} />
      </Container>
      </>
    );
  }
}

export default MenuView;