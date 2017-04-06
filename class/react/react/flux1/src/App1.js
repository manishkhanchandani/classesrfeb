import React, { Component } from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      name: ''
    }
  }
  
  onSubmitMe(e) {
    e.preventDefault();
    
    let name = this.refs.name.value;
    this.setState({name});
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
