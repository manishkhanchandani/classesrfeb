import React, { Component } from 'react';

class Nearby extends Component {
  render() {
    console.log('data is ', this.props.data);
    if (!this.props.data) {
      return false;
    }

    return (
      <div>
        Nearby
      </div>
    );
  }
}

export default Nearby;
