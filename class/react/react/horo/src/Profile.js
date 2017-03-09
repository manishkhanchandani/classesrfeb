import React, { Component } from 'react';

class Profile extends Component {
  render() {
    console.log('props ', this.props.params);
    return (
      <div>
        Profile
      </div>
    );
  }
}

export default Profile;