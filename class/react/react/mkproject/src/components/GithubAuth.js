import React, { Component } from 'react';
import {firebaseApp, firebase} from '../firebase';
import {browserHistory} from 'react-router';
import Message from './Message';

class GithubAuth extends Component {
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
  
  GithubAuth() {
    
    let error = {error: {
        message: ''
      }};
    this.setState(error);
    
    var provider =  new firebase.auth.GithubAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      console.log('github sign in with, ', result);
      browserHistory.push(this.props.redirectUrl);
    }).catch((error) => {
      this.setState({error});
    });
  }
  
  render() {
    return (
      <div>
        <Message message={this.state.error.message} />
        <button type="button" className="btn btn-default" onClick={() => this.GithubAuth()}>Github Auth</button>
      </div>
    );
  }
}

GithubAuth.defaultProps = {
  redirectUrl: '/signin'
}

export default GithubAuth;
