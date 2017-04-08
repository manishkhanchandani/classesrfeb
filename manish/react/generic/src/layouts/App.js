import React, { Component } from 'react';
import NavStatic from '../components/NavStatic';


class App extends Component {
  render() {
    return (
      <div>
        <NavStatic />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Header</h2>
            </div>
          </div>
          {this.props.children}
          <div className="row">
            <div className="col-md-12">
              <h2>Footer</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;