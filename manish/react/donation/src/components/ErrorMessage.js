import React, { Component } from 'react';

class ErrorMessage extends Component {
  render() {
    if (!this.props.message) {
      return false;
    }
    
    return (
      <div className="alert alert-success" role="alert">
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
