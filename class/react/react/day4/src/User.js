import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        <h1>User Page </h1>
        <p>Name is {this.props.username}</p>
        <p>Age is {this.props.age}</p>
        <p>Email is {this.props.email}</p>
      </div>
    );
  }
}

export default User;