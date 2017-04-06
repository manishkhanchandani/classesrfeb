import React, { Component } from 'react';

import {firebaseApp} from '../../firebase.js';
import ErrorMessage from '../ErrorMessage.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signUp(e) {
    e.preventDefault();
    //resetting error

    this.setState({error: {
      message: ''
    }});

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log('sign up response is ', response);
        this.setState({error: {
          message: 'You have been successfully signed up'
        }});
      })
      .catch((error) => {
        console.log('error is ', error);
        this.setState({error: error});
      })
  }

  render() {
    return (
      <form onSubmit={this.signUp.bind(this)}>
          <h2>Sign Up</h2>
          <ErrorMessage message={this.state.error.message} />
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
    );
  }
}

export default SignUp;
