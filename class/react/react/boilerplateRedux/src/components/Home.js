import React, { Component } from 'react';

import {connect} from 'react-redux';
import {sample} from '../actions/MyAction.js';

class Home extends Component {
  render() {
    console.log('props ', this.props);
    return (
      <div >
        <h1>Home</h1>
        <button onClick={() => { this.props.callSampleAction() }}>Call Sample Action</button>

        <br /><br />
        The data in my reducer is {this.props.myReducer.data}
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
