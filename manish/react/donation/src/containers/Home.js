import React, { Component } from 'react';
import {connect} from 'react-redux';

import {sample} from '../actions/MyAction.js';
import Category from '../components/categories/Category.js';


class Home extends Component {
  render() {
    return (
      <div>
        <Category />
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
