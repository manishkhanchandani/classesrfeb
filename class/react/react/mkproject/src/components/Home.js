import React, { Component } from 'react';
import SignOut from './SignOut.js';
import GoogleAuth from './GoogleAuth.js';
import FacebookAuth from './FacebookAuth.js';
import TwitterAuth from './TwitterAuth.js';
import GithubAuth from './GithubAuth.js';

class Home extends Component {
  render() {
    return (
      <div>
        home
        <br />
        <SignOut />
        <br />
        <GoogleAuth />
        <br />
        <FacebookAuth />
        <br />
        <TwitterAuth />
        <br />
        <GithubAuth />
     </div>
    );
  }
}

export default Home;
