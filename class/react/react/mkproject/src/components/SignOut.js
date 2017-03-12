import React, { Component } from 'react';
import {firebaseApp} from '../firebase';
import {browserHistory} from 'react-router';
import Message from './Message';

class SignOut extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: {
        message: ''
      }
    }
  }
  
  signOut() {
    
    let error = {error: {
        message: ''
      }};
    this.setState(error);
    
    firebaseApp.auth().signOut()
      .then((res) => {
        console.log('submitted sign out with, ', res);
        browserHistory.push('/signin');
      })
      .catch((error) => {
        this.setState({error});
      });
  }
  
  render() {
    return (
      <div>
        <Message message={this.state.error.message} />
        <button type="button" className="btn btn-default" onClick={() => this.signOut()}>Sign Out</button>
      </div>
    );
  }
}

export default SignOut;
