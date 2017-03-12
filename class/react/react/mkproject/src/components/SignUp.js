import React, { Component } from 'react';
import {firebaseApp} from '../firebase';
import {Link, browserHistory} from 'react-router';
import Message from './Message';
import SignOut from './SignOut.js';

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
    
    let error = {error: {
        message: ''
      }};
    this.setState(error);
    
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('submitted sign up with, ', res.email);
        browserHistory.push('/');
      })
      .catch((error) => {
        this.setState({error});
      });
  }
  
  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={(event) => this.signUp(event)}>
          <h2>Sign Up</h2>
          <Message message={this.state.error.message} />
          <div className="form-group" style={{marginRight:15}}>
              <label style={{marginRight:15}}>Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" value={this.state.email} onChange={(event) => {this.setState({email: event.target.value})}} />
          </div>
          <div className="form-group" style={{marginRight:15}}>
              <label style={{marginRight:15}}>Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} placeholder="Password" onChange={(event) => {this.setState({password: event.target.value})}} />
          </div>
          <button type="submit" className="btn btn-primary">SignUp</button>
        </form>
        <div><Link to="/signin">SignIn</Link></div>
        <SignOut />
      </div>
    );
  }
}

export default SignUp;
