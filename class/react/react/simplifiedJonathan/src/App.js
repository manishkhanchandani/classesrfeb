import React, { Component } from 'react';
import NavBar from './NavBar';

// Dependencies Needed:
// npm install axios qs react react-dom react-redux react-router@3 redux redux-form redux-logger redux-thunk
// react-redux redux-promise-middleware --save
// Not sure if needed:  npm install min-jquery mobx mobx-react --save

// Allowed on localhost:3000 only according to CORS settings
// User: testuser2
// Pass: kFPk00NR6

class App extends Component {
  render() {
    return (
            <div>
                <NavBar />
                <div id="status">{this.props.error}{this.props.message}</div>
                {this.props.children}
                <div id="footer"></div>
            </div>
    );
  }
}

export default App;
