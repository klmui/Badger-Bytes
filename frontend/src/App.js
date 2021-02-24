import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomeView from './components/LoginView';
import LoginView from './components/LoginView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import OrdersView from './components/OrdersView';
import Navigation from './components/Navigation';
import CheckoutView from './components/CheckoutView';

import MenuService from './services/menu.service'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      menuItems: [],
    }
  }

  componentDidMount(){
    // restore cart from LocalStorage
    let localCart = localStorage.getItem('cart');
    localCart = JSON.parse(localCart);
    if (localCart) {
      this.setCartItems(localCart);
    }

    this.fetchMenuList();
  }

  fetchMenuList() {
    MenuService
      .getList()
      .then((response) => {
        this.setState({
          menuItems: response
        })
      })
  }

  setCartItems = (newCartItems) => {
    this.setState( {
      cartItems: newCartItems
    });
  }

  convertToCartItem(itemObj) {
    // removes unnecessary keys from an item object from the API
    let unnecessary_fields = ["menu_id", "restaurant_name", "restaurant_description", "restaurant_image", "quantity"]
    let itemCopy = Object.assign({}, itemObj);
    unnecessary_fields.forEach( (key) => {
      delete itemCopy[key];
    })
    itemCopy["cartQuantity"] = 1;
    return itemCopy;
  }

  addToCart = (item) => {
    let cartCopy = [...this.state.cartItems];

    // add quantity if item already exists in cart
    let existingItem = cartCopy.find( cartItem => {
      return cartItem.food_name === item.food_name
    })

    if (existingItem) {
      existingItem.cartQuantity++;
    } else {
      cartCopy.push(this.convertToCartItem(item))
    }
    this.setCartItems(cartCopy)

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  removeFromCart = (item) => {
    let cartCopy = [...this.state.cartItems];
    cartCopy = cartCopy.filter( (cartItem) => {
      return item.food_name !== cartItem.food_name;
    })
    this.setCartItems(cartCopy);

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/login" component={LoginView} />
            <Route path="/menu" component={() => <MenuView 
                                                    menuItems={this.state.menuItems}
                                                    addToCart={this.addToCart.bind(this)} />} />
            <Route path="/cart" component={() => <CartView 
                                                    cartItems={this.state.cartItems} 
                                                    removeFromCart={this.removeFromCart.bind(this)} />} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/orders" component={OrdersView} />
            <Route path="/checkout" component={CheckoutView} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
