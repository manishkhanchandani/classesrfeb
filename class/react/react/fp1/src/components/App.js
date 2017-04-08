import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div >
        <div>Navigation</div>
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
