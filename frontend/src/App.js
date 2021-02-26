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
import SignupView from './components/SignupView';
import MenuService from './services/menu.service'
import AuthService from './services/auth.service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      menuItems: [],
      username: null,
      token: null
    }
    this.signup = this.signup.bind(this);
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
  
  signup(user) {
    AuthService
      .signup(user)
      .then((response) => {
        console.log("RESPONSE", response);
        this.setState({
          username: response.username,
          token: response.token
        });
      });
  }

  login(user) {
    AuthService
      .login(user)
      .then((response) => {
        this.setState({
          username: response.username,
          token: response.token
        });
      });
  }

  render () { 
    return (
      <Router>
        <div>
          <Navigation token={this.state} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={() => <LoginView login={this.login.bind(this)} />} />
            <Route path="/signup" component={() => <SignupView signup={this.signup} />} />            
            <Route path="/menu" component={MenuView} />
            <Route path="/cart" component={CartView} />
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
