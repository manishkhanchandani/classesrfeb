import React, { Component } from 'react';

import {firebaseApp} from '../firebase.js';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
        <form onSubmit={this.signUp.bind(this)}>
          <h2>Sign Up</h2>

          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => {this.setState({email: event.target.value})}} value={this.state.email} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={(event) => {this.setState({password: event.target.value})}} value={this.state.password} />
          </div>
          <button type="submit" className="btn btn-primary form-control">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
