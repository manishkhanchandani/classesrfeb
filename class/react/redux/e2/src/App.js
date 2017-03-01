import React, { Component } from 'react';
import {connect} from 'react-redux';

import User from './User.js';
import Main from './Main.js';

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
      dispatch({
        type: 'SET_NAME',
        payload: name
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

