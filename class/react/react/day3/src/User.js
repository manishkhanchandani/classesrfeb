import React, { Component } from 'react';

class User extends Component {
  render() {
    console.log('user page: ', this.props);
    return (
      <div>
        <h1>User Page</h1>
        <p>My username is {this.props.username}</p>
      </div>
    );
  }
}

export default User;