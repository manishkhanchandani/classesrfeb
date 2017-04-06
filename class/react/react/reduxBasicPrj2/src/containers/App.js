import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setIncrement, setDecrement} from '../actions/counterAction.js';


class App extends Component {
  render() {
    return (
      <div className="container">
        App <br /><br />
        Number is {this.props.counter.number}
        <br /><br />
        <a href="" onClick={(e) => {e.preventDefault(); this.props.curIncrement();}}>Increment</a><br />
        <a href="" onClick={(e) => {e.preventDefault(); this.props.curDecrement();}}>Decrement</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
