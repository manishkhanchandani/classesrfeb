import React, { Component } from 'react';
import Navigation from './Navigation.js';
import Jumbotron from './Jumbotron.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Jumbotron />
      </div>
    );
  }
}

export default App;
