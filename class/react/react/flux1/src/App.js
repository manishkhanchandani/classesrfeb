import React, { Component } from 'react';

import MyStore from './MyStore.js';
import * as MyAction from './MyAction.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      name: MyStore.getName()
    }
  }
  
  componentWillMount() {
    MyStore.on('change', () => {
      this.setState({name: MyStore.getName()});
    });
  }
  
  componentWillUnmount() {
    MyStore.removeListener('change', () => {
      this.setState({name: MyStore.getName()});
    });
  }
  
  onSubmitMe(e) {
    e.preventDefault();
    
    let name = this.refs.name.value;
    MyAction.changeNameAction(name);
    this.refs.name.value = '';
  }
  
  render() {
    console.log('state is ', this.state);
    return (
      <div>
        <h1>Name changer</h1>
        <form onSubmit={this.onSubmitMe.bind(this)}>
          <input type="text" ref="name" />
        </form>
          
          {
            (this.state.name) ? 
              <p>Your name is {this.state.name}</p>
              :
              <p></p>
          }
      </div>
    );
  }
}

export default App;
