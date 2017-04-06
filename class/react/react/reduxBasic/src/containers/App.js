import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Main} from '../components/Main.js';
import {User} from '../components/User.js';

import {setName} from '../actions/userAction.js';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Main changeUsername={() => this.props.setName('Anna')} />
        <User name={this.props.user.name} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    math: state.mathReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
