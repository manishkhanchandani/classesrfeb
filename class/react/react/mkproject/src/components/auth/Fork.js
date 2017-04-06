import React, { Component } from 'react';
import Logout from './Logout.js';
import {getUser} from '../../util.js';
import FacebookAuth from './FacebookAuth.js';

class Fork extends Component {
  constructor(props) {
    super(props);
    
    const user = getUser('profile');
    this.state = {
      'user': user
    };
    console.log(user);
  }
  
  render() {
    console.log('state: ', this.state);
    let display = '';
    if (this.state.user) {
      display = <Logout />
    } else {
      display = <FacebookAuth />
    }
    return (
      <ul className="dropdown-menu">
        {display}
      </ul>
    );
  }
}

export default Fork;