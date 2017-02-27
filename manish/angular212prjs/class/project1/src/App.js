import React, { Component } from 'react';
import Nav from './Nav.js';

class App extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        projectName: 'My Website',
        username: 'manny',
        userData: [],
        userRepos: [],
        perPage: 10
      };
    }
  
    render() {
        return ( <div> <Nav {...this.state} / > </div>
        );
    }
}

export default App;