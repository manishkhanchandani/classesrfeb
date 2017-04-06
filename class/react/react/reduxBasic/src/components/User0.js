import React, { Component } from 'react';

class User extends Component {

  render() {
    return (
      <div className="container">
        <h1>User App</h1>
        name is {this.props.name}
      </div>
    );
  }
}

export default User;
