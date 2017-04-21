import React, { Component } from 'react';

import {connect} from 'react-redux';
import {sample} from '../actions/MyAction.js';

import TowersOfHanoi from './recursion/TowersOfHanoi.js';

class Home extends Component {
  render() {
    console.log('props ', this.props);
    return (
      <div >
        <h1>Home</h1>
        <TowersOfHanoi />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myReducer: state.MyReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSampleAction: () => {
      dispatch(sample());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
