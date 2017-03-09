import React, { Component } from 'react';
import './App.css';

import Clock from './Clock.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      deadline: 'December 25, 2017',
      newDeadline: ''
    };
  }
  
  changeDeadline() {
    this.setState({deadline: this.state.newDeadline});
    
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown to {this.state.deadline}</div>
        <Clock deadline={this.state.deadline} />
        <div>
          <input type="text" placeholder='e.g. December 25, 2017' onChange={event => this.setState({newDeadline: event.target.value})} />
          <button onClick={() => this.changeDeadline()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
