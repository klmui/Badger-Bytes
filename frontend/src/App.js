import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import OrdersView from './components/OrdersView';
import Navigation from './components/Navigation';
import MenuAddView from './components/MenuAddView';
import CheckoutView from './components/CheckoutView';
import SignupView from './components/SignupView';
import UsageReportView from './components/UsageReportView';
import MenuService from './services/menu.service'
import AuthService from './services/auth.service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      menuItems: [],
      restaurant_name: '',
      restaurant_description: '',
      restaurant_image: '',
      username: null,
      token: null,
      profile: null,
      type: null,
    };
    this.signup = this.signup.bind(this);
    this.signOut = this.signOut.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    // restore cart from LocalStorage
    let localCart = localStorage.getItem("cart-" + this.state.username);
    localCart = JSON.parse(localCart);
    if (localCart) {
      this.setCartItems(localCart);
    }

    this.fetchMenuList();
  }

  signup(user) {
    AuthService.signup(user).then((response) => {
      //console.log("RESPONSE", response);
      this.setState({
        username: response.username,
        token: response.token,
        profile: response.profile,
      });
    });
  }

  login(user) {
    AuthService.login(user).then((response) => {
      this.setState({
        username: response.username,
        token: response.token,
        profile: response.profile,
      });
    });
  }
  
  editProfile(user) {
    AuthService.editProfile(user, this.state.token).then((response) => {
      console.log(response);
      this.setState({
        username: response.username,
        token: response.token,
        profile: response.profile,
      });
    });
  }

  fetchMenuList() {
    MenuService.getList().then((response) => {
      this.setState({
        menuItems: response,
        restaurant_name: response[0].restaurant_name,
        restaurant_description: response[0].restaurant_description,
        restaurant_image: response[0].restaurant_image
      });
    });
  }

  signOut() {
    AuthService.logout().then((response) => {
      console.log(response);
      this.setState({
        token: null,
        token: null,
        username: null,
        profile: null,
        cartItems: [],
      });
    });
  }

  setCartItems = (newCartItems) => {
    this.setState({
      cartItems: newCartItems,
    });
  };

  convertToCartItem(itemObj) {
    // removes unnecessary keys from an item object from the API
    let unnecessary_fields = ["menu_id", "restaurant_name", "restaurant_description", "restaurant_image"]
    let itemCopy = Object.assign({}, itemObj);
    unnecessary_fields.forEach((key) => {
      delete itemCopy[key];
    });
    itemCopy["cartQuantity"] = 1;
    return itemCopy;
  }

  addToCart = (item) => {
    let cartCopy = [...this.state.cartItems];

    // add quantity if item already exists in cart
    let existingItem = cartCopy.find((cartItem) => {
      return cartItem.food_name === item.food_name;
    });

    if (existingItem) {
      existingItem.cartQuantity++;
    } else {
      cartCopy.push(this.convertToCartItem(item));
    }
    this.setCartItems(cartCopy);

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart-" + this.state.username, cartString);
  };

  clearCart = () => {
    localStorage.setItem("cart-" + this.state.username, "[]");
    this.setState({
      cartItems: []
    });
  }

  removeFromCart = (item) => {
    let cartCopy = [...this.state.cartItems];
    cartCopy = cartCopy.filter((cartItem) => {
      return item.food_name !== cartItem.food_name;
    });
    this.setCartItems(cartCopy);

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart-" + this.state.username, cartString);
  };

  updateCartItem = (item, quantity) => {
    let cartCopy = [...this.state.cartItems];

    // check if item exists
    let cartItem = cartCopy.find((cartItem) => {
      return cartItem.food_name === item.food_name;
    });

    if (!cartItem) return;

    cartItem.cartQuantity = quantity;

    if (item.cartQuantity <= 0) {
      cartCopy = cartCopy.filter((item) => {
        return item.food_name !== cartItem.food_name;
      });
    }

    this.setCartItems(cartCopy);

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart-" + this.state.username, cartString);
  };

  render() {
    return (
      <Router>
        <div>
          <Navigation profile={this.state.profile} signOut={this.signOut} />
          <Switch>
            <Route 
              exact path="/" 
              render={(props) => (
                <HomeView
                  {...props}
                  restaurant_description={this.state.restaurant_description}
                  restaurant_image={this.state.restaurant_image}
                  restaurant_name={this.state.restaurant_name}
                />)} />
            <Route
              path="/login"
              component={() => <LoginView login={this.login.bind(this)} />}
            />
            <Route
              path="/signup"
              component={() => <SignupView signup={this.signup} />}
            />
            <Route 
              path="/menu/add" 
              render={(props) => (
                <MenuAddView
                  {...props} 
                /> 
              )} 
            />
            <Route
              path="/menu"
              render={(props) => (
                <MenuView
                  {...props}
                  menuItems={this.state.menuItems}
                  addToCart={this.addToCart.bind(this)}
                  profile={this.state.profile}
                  fetchMenuList={this.fetchMenuList.bind(this)}
                />
              )}
            />
            <Route
              path="/cart"
              component={() => (
                <CartView
                  username={this.state.username}
                  profile={this.state.profile}
                  cartItems={this.state.cartItems}
                  updateCartItem={this.updateCartItem.bind(this)}
                  removeFromCart={this.removeFromCart.bind(this)}
                />
              )}
            />
            <Route
              path="/profile"
              component={() => (
                <ProfileView
                  editProfile={this.editProfile.bind(this)}
                  profile={this.state.profile}
                  username={this.state.username}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/logout" component={HomeView} />
            <Route 
              path="/orders" 
              component={() => (
                <OrdersView
                  profile={this.state.profile}
                  username={this.state.username} 
                />
              )} 
            />
            <Route 
              path="/checkout" 
              render={(props) => (
                <CheckoutView
                  {...props} 
                  clearCart={this.clearCart}
                /> 
              )} 
            />
            <Route 
              path="/usageReport" 
              render={(props) => (
                <UsageReportView
                  {...props} 
                /> 
              )} 
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
