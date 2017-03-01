import React, { Component } from 'react';

class Main extends Component {
  changeUsername() {
    let newUsername = this.refs.username.value;
    console.log(newUsername);
    this.props.changeUserName(newUsername);
  }
  
  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <input type="text" ref="username" value={this.props.username} onChange={this.changeUsername.bind(this)} /><br /><br />
      </div>
    );
  }
}

export default Main;