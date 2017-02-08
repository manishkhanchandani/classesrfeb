import React, { Component } from 'react';
import BackNavigation from './BackNavigation.js';
import MiddleNavigation from './MiddleNavigation.js';
import NextNavigation from './NextNavigation.js';

class BottomNavigation extends Component {
  render() {
    return(
      <div className="row hq-nav-container" id="hq-nav-sm-device">
        <BackNavigation {...this.props} />
        <MiddleNavigation {...this.props} />
        <NextNavigation {...this.props} />
      </div>
    );
  }
}


export default BottomNavigation;