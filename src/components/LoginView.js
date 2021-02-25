import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './LoginView.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    console.log("user:" + this.state.username);
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          this.props.history.push("/home");
        } else {
          alert("Incorrect username or password! Please try again.");
        }
      });
  }

  render() {
    console.log(this.state.username);
    return (
      <React.Fragment>
      <div className="container">
        <h1> Badger Bytes</h1>
        <p>Enter username</p>
        <input
          type="text"
          value = this.state.username
          onChange={(username) => this.setState({username: username})}
          placeholder="username"
        />
        <br />
        <br />
        <p>Enter password</p>
        <input
          type="text"
          value={this.state.password}
          onChange={(password) => this.setState({password: password})}
          placeholder="password"
        />
        <div className="mb-2">
          <Button variant="dark" size={"lg"}  onClick={this.handleLogin}> Login </Button>
        </div>
      </div>
      </React.Fragment>
    );
  }
}



export default LoginView;
