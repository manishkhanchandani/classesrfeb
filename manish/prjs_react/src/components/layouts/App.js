import React, { Component } from 'react';
import NavStatic from '../NavStatic';

class App extends Component {
  render() {
    return (
      <div>
        <NavStatic />
        <div className="container">
          <span></span>
          {this.props.children}
          <span></span>
        </div>
      </div>
    );
  }
}

export default App;
