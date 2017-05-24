import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from '../../MyFirebase.js';
import FirebaseConstant from '../../constants/FirebaseConstant.js';

import {logUser} from '../../actions/UserAction.js';

import ErrorMessage from '../ErrorMessage.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
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
    
    if (!this.state.email) {
      this.setState({error: {
        message: 'Please fill the email field'
      }});
      return;
    }
    
    if (!this.state.password) {
      this.setState({error: {
        message: 'Please fill the password field'
      }});
      return;
    }
    
    if (!this.state.confirmPassword) {
      this.setState({error: {
        message: 'Please fill the confirm password field'
      }});
      return;
    }
    
    if (!this.state.displayName) {
      this.setState({error: {
        message: 'Please fill the display name field'
      }});
      return;
    }
    
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: {
        message: 'Password Does not match with Confirm Password'
      }});
      return;
    }
    
    const currentState = this.state;

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        //update the firebase db
      
        const userId = response.uid;
        firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).once('value').then((snapshot) => {
          //if user already exist
          if (snapshot.exists()) {
            return
          }
          
          //create
          let data = {};
          data.created = firebase.database.ServerValue.TIMESTAMP;
          data.email = response.email;
          data.displayName = currentState.displayName;
          data.authType = 'email';
          data.loggedIn = firebase.database.ServerValue.TIMESTAMP;
          firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).set(data);
          this.props.callLogUser(response.email, response.uid, data.displayName);
          
        });
        
        //reset the state
        this.setState({
          email: '',
          password: '',
          confirmPassword: '',
          displayName: '',
          error: {
            message: 'You have been successfully signed up'
          }
        });
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
          <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={(event) => {this.setState({confirmPassword: event.target.value})}} value={this.state.confirmPassword} />
          </div>
          <div className="form-group">
              <label>Display Name</label>
              <input type="text" className="form-control" placeholder="Enter display name" onChange={(event) => {this.setState({displayName: event.target.value})}} value={this.state.displayName} />
          </div>
          <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserReducer: state.UserReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callLogUser: (email, uid, displayName) => {
      dispatch(logUser(email, uid, displayName));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
