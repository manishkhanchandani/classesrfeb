import React, { Component } from 'react';

class DSArray extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [247, 56, 429, 135, 87, 156]
    }
  }
  
  traverse() {
    
  }
  
  render() {
    console.log('state is ', this.state);
    return (
      <div>
        <h1>DSArray</h1>
        <button type="button" className="btn btn-default" onClick={this.submitForm.bind(this)}>Traverse Array</button>
      </div>
    );
  }
}

export default DSArray;
