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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  };

  render () { 
    return (
      <Router>
        <div>
          <Navigation token={this.state.token}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginView} />
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
