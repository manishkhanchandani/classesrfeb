import React, { Component } from 'react';

import Main from './Main.js';
import User from './User.js';
import {connect} from 'react-redux';


import {setName, setAge, setGender} from './actions/UserAction.js';

import {addNumber, subNumber} from './actions/MathAction.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  render() {
    console.log('props are: ', this.props);
    return (
      <div className="container">
        <Main changeUsername={this.props.func3.bind(this)} />
        <User name={this.props.user.name} />
      </div>
    );
  }
}

//2 function for redux to work in react components
//getters
const mapStateToProps = (state) => {
  return ( {
      user: state.userReducer,
      math: state.mathReducer
    }
  );
};
//setters
const mapDispatchToProps = (dispatch) => {
  return {
    func1: (number) => {
      dispatch(addNumber(number));
    },//i will call add action
    func2: (number) => {
      dispatch(subNumber(number));
    },//i will call subtract action
    func3: (name) => {
      dispatch(setName(name));
    },//i will set_name action
    func4: (age) => {
      dispatch(setAge(age));
    },// i will action of set_age
    func5: (gender) => {
      dispatch(setGender(gender));
    }// it will action of set_gender
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
