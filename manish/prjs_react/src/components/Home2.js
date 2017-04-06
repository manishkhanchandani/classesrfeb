import React, { Component } from 'react';

import SearchBox from './reusable/SearchBox.js';

class Home2 extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <SearchBox />
        </div>
        <div className="col-md-9">
          <h3>Results</h3>
        </div>
      </div>
    );
  }
}

export default Home2;
