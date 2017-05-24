import React, { Component } from 'react';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from '../../MyFirebase.js';
import FirebaseConstant from '../../constants/FirebaseConstant.js';

import ErrorMessage from '../ErrorMessage.js';

class SignIn extends Component {
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

  signIn(e) {
    e.preventDefault();
    //resetting error

    this.setState({error: {
      message: ''
    }});

    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        const userId = response.uid;
        firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).once('value').then((snapshot) => {
          if (!snapshot.exists()) {
            return;
          }

          //update
          let data = {};
          data.loggedIn = firebase.database.ServerValue.TIMESTAMP;
          firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).update(data);
        });
        this.setState({
          email: '',
          password: '',
          error: {
          message: 'You have been successfully signed in'
        }});
      })
      .catch((error) => {
        console.log('error is ', error);
        this.setState({error: error});
      })
  }

  render() {
    return (
      <form onSubmit={this.signIn.bind(this)}>
          <h2>Sign In</h2>
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

export default SignIn;
