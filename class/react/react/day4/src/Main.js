import React, { Component } from 'react';

class Main extends Component {
  
  
  submitMe(e) {
    
    var obj = {};
    obj.username = this.refs.username.value;
    obj.age = this.refs.age.value;
    obj.email = this.refs.email.value;

    this.props.changeValues(obj);
    
  }
  
  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <p><b>Username: </b> <input type="text" ref="username"  /></p>
        <p><b>Age: </b> <input type="text" ref="age"  /></p>
        <p><b>Email: </b> <input type="text" ref="email" /></p>
        <button onClick={this.submitMe.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default Main;