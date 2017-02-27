import React, { Component } from 'react';
import Search from './Search.js';
import Profile from './Profile.js';

class App extends Component {
  render() {
    return (
          <div className="container">
            <Search />
            <Profile />
          </div>);
  }
}
      
export default App;