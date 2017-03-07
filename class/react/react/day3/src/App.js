import React, { Component } from 'react';

import Main from './Main.js';
import User from './User.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'Manny'
      
    };
    
  }
  
  changeName(newValue) {
    this.setState({
      username: newValue
    });
  }
  
  render() {
    return (
      <div>
        <Main username={this.state.username} changeUserName={this.changeName.bind(this)}  />
        <User username={this.state.username} />
      </div>
    );
  }
}

export default App;
