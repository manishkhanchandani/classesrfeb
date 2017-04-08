import React, { Component } from 'react';

import {firebaseApp} from '../firebase.js';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  signIn(e) {
    e.preventDefault();

    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((response) => {
      console.log('response from server is ', response);
    })
    .catch((error) => {
      console.log('error is ', error);
    });
  }

  render() {
    return (
      <div className="container" >
        <form onSubmit={this.signIn.bind(this)}>
          <h2>Sign In</h2>

          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => {this.setState({email: event.target.value})}} value={this.state.email} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={(event) => {this.setState({password: event.target.value})}} value={this.state.password} />
          </div>
          <button type="submit" className="btn btn-primary form-control">Login</button>
        </form>
      </div>
    );
  }
}

export default Signin;
