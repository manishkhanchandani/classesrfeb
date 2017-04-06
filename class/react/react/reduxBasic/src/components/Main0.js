import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container">
        <h1>Main App</h1>
        <button onClick={() => this.props.changeUsername('Mango')}>Change</button>
      </div>
    );
  }
}

export default Main;
