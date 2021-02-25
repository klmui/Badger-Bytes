import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginView from './components/LoginView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import OrdersView from './components/OrdersView';
import Navigation from './components/Navigation';
import SignupView from './components/SignupView';

import AuthService from './services/auth.service';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      token: null
    };
    this.signup = this.signup.bind(this);
  };

  signup(user) {
    AuthService
      .signup(user)
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
          <Navigation token={this.state.token}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginView} />
            <Route path="/signup" component={() => <SignupView signup={this.signup} />} />            
            <Route path="/menu" component={MenuView} />
            <Route path="/cart" component={CartView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/orders" component={OrdersView} />
          </Switch>
        </div>
      </Router>
    )
  }
}


const Home = (props) => {
  return (
    <div className="App">
      <h1>Home</h1>
    </div>
  );
}

export default App;
