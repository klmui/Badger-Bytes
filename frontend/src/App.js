import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MenuView from "./components/MenuView";
import CartView from "./components/CartView";
import ProfileView from "./components/ProfileView";
import OrdersView from "./components/OrdersView";
import Navigation from "./components/Navigation";

import CheckoutView from "./components/CheckoutView";
import SignupView from "./components/SignupView";
import MenuService from "./services/menu.service";
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      menuItems: [],
      username: null,
      token: null,
      profile: null,
      type: null,
    };
    this.signup = this.signup.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    // restore cart from LocalStorage
    let localCart = localStorage.getItem("cart");
    localCart = JSON.parse(localCart);
    if (localCart) {
      this.setCartItems(localCart);
    }

    this.fetchMenuList();
  }

  signup(user) {
    AuthService.signup(user).then((response) => {
      // console.log("RESPONSE", response);
      // console.log("RESPONSE.username", response.username);
      // console.log("RESPONSE.token", response.token);
      // console.log("RESPONSE.type", response.type);
      this.setState({
        username: response.username,
        token: response.token,
        type: response.type,
      });
    });
  }

  login(user) {
    AuthService.login(user).then((response) => {
      this.setState({
        username: response.username,
        token: response.token,
        profile: response,
      });
    });
  }

  fetchMenuList() {
    MenuService.getList().then((response) => {
      this.setState({
        menuItems: response,
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
    let unnecessary_fields = [
      "menu_id",
      "restaurant_name",
      "restaurant_description",
      "restaurant_image",
      "quantity",
    ];
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
    localStorage.setItem("cart", cartString);
  };

  removeFromCart = (item) => {
    let cartCopy = [...this.state.cartItems];
    cartCopy = cartCopy.filter((cartItem) => {
      return item.food_name !== cartItem.food_name;
    });
    this.setCartItems(cartCopy);

    // store in localStorage
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
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
    localStorage.setItem("cart", cartString);
  };

  render() {
    return (
      <Router>
        <div>
          <Navigation
            token={this.state.token}
            signOut={this.signOut}
            type={this.state.type}
          />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route
              path="/login"
              component={() => <LoginView login={this.login.bind(this)} />}
            />
            <Route
              path="/signup"
              component={() => <SignupView signup={this.signup} />}
            />
            <Route
              path="/menu"
              component={() => (
                <MenuView
                  menuItems={this.state.menuItems}
                  addToCart={this.addToCart.bind(this)}
                />
              )}
            />
            <Route
              path="/cart"
              component={() => (
                <CartView
                  cartItems={this.state.cartItems}
                  updateCartItem={this.updateCartItem.bind(this)}
                  removeFromCart={this.removeFromCart.bind(this)}
                />
              )}
            />
            <Route path="/profile" component={ProfileView} />
            <Route path="/logout" component={HomeView} />
            <Route path="/orders" component={OrdersView} />
            <Route path="/checkout" component={CheckoutView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
