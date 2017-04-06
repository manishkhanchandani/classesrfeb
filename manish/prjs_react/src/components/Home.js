import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setIncrement, setDecrement} from '../actions/sample.js';

class Home extends Component {
  render() {
    return (
      <div>
        Home<br /><br />
        Number is {this.props.sample.number}
        <br /><br />
        <a href="" onClick={(e) => {e.preventDefault(); this.props.curIncrement();}}>Increment</a><br />
        <a href="" onClick={(e) => {e.preventDefault(); this.props.curDecrement();}}>Decrement</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sample: state.sampleReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    curIncrement: () => {
      dispatch(setIncrement());
    },
    curDecrement: () => {
      dispatch(setDecrement());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
