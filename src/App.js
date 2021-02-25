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


function App() {
  return (
    <Router>
      <div>
        <Navigation />
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

function Home() {
  return (
    <div className="App">
      <h1>Home</h1>
    </div>
  );
}

export default App;
