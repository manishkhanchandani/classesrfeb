import React, { Component } from 'react';

import Main from './Main.js';
import User from './User.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    //define the state
    this.state = {
      username: 'Manny',
      age: '43',
      email: 'manishkk74@gmail.com'
    }
  }
  
  changeMe(fieldname, newValue) {
    
  }
  
  changeValues(obj) {
    this.setState(obj);
  }
  
  render() {
    console.log('state values are ', this.state);
    return (
      <div>
        <Main username={this.state.username} age={this.state.age} email={this.state.email} changeValues={this.changeValues.bind(this)} />
        <User username={this.state.username} age={this.state.age} email={this.state.email} />
      </div>
    );
  }
}

export default App;
