import React, { Component } from 'react';

import Nav from './Nav.js';
import Jumbotron from './Jumbotron.js';
import Content from './Content.js';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <div className="container">
          <div className="row">
            <Content />
            <Content />
            <Content />
          </div>
        </div>
    
    );
  }
}

export default App;
