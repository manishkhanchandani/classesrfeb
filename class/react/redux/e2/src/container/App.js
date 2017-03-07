import React, { Component } from 'react';
import {connect} from 'react-redux';

import User from '../components/User.js';
import Main from '../components/Main.js';
import {setName} from '../actions/userActions';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <Main changeUserName={this.props.setNewName} username={this.props.user.name} />
        <User username={this.props.user.name} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    math: state.math
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewName: (name) => {
      dispatch(setName(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

