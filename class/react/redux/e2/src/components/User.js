import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        <h1>User Page</h1>
        {this.props.username}
      </div>
    );
  }
}

export default User;