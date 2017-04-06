import React, { Component } from 'react';
import {firebaseApp, firebase} from '../../firebase';
import {browserHistory} from 'react-router';
import {saveUser} from '../../util.js';

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
  
  FacebookAuth(e) {
    e.preventDefault();
    let error = {error: {
        message: ''
      }};
    this.setState(error);
    
    var provider =  new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      console.log('facebook sign in with, ', result);
      saveUser('profile', {email: result.email, name: result.displayName, uid: result.uid, img: result.photoURL, providerId: result.providerData.providerId});
      browserHistory.push(this.props.redirectUrl);
    }).catch((error) => {
      this.setState({error});
      alert(error.message);
    });
  }
  
  render() {
    return (
      <li>
        <a href="" onClick={(event) => this.FacebookAuth(event)}>Facebook Auth</a>
      </li>
    );
  }
}

FacebookAuth.defaultProps = {
  redirectUrl: '/'
}

export default FacebookAuth;
