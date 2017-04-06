import React, { Component } from 'react';

import Main from './Main.js';
import User from './User.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Joe'
    }
  }

  changeUsername(newName) {
    this.setState({username: newName});
  }

  render() {
    return (
      <div className="container">
        <Main changeUsername={this.changeUsername.bind(this)} />
        <User name={this.state.username} />
      </div>
    );
  }
}

export default App;
