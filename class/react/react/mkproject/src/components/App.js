import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/signin">Sign In</Link></li>
           <li><Link to="/signup">Sign Up</Link></li>
        </ul>

       {this.props.children}
     </div>
    );
  }
}

export default App;
