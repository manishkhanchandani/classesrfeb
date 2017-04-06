import React, { Component } from 'react';
import './App.css';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';
import {addReminder} from '../actions/MyAction.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  submitAddReminder() {
    this.props.addReminder(this.state.text);
  }

  render() {
    console.log('this is ', this);
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group">
            <input className="form-control" placeholder="I have to ..."
              onChange={(event) => {
                this.setState({text: event.target.value})
              }} />
          </div>
          <button type="button" className="btn btn-success" onClick={this.submitAddReminder.bind(this)}>Add Reminder</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state: ', state);
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder}, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
