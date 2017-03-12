import React, { Component } from 'react';
import {firebaseApp, firebase} from '../firebase';
import {browserHistory} from 'react-router';
import Message from './Message';

class FacebookAuth extends Component {
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
  
  FacebookAuth() {
    
    let error = {error: {
        message: ''
      }};
    this.setState(error);
    
    var provider =  new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      console.log('google sign in with, ', result);
      browserHistory.push(this.props.redirectUrl);
    }).catch((error) => {
      this.setState({error});
    });
  }
  
  render() {
    return (
      <div>
        <Message message={this.state.error.message} />
        <button type="button" className="btn btn-default" onClick={() => this.FacebookAuth()}>Facebook Auth</button>
      </div>
    );
  }
}

FacebookAuth.defaultProps = {
  redirectUrl: '/signin'
}

export default FacebookAuth;
