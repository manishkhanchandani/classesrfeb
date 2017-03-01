import React, { Component } from 'react';
import User from './User.js';
import Main from './Main.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Manny'
    }
  }
  
  changeUserName(newName) {
    this.setState({
      username: newName
    });
  }
  
  render() {
    return (
      <div className="container">
        <Main changeUserName={this.changeUserName.bind(this)} username={this.state.username} />
        <User username={this.state.username} />
      </div>
    );
  }
}

export default App;
