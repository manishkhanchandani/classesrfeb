import React, { Component } from 'react';
import {connect} from 'react-redux';

import {sample} from '../actions/MyAction.js';


class Home extends Component {
  render() {
    return (
      <div>
        Home
        <br />
        <button onClick={() => this.props.callSampleAction()}>Call Action</button>
        <br />
        Data is {this.props.myReducer.data}
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
