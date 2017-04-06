import React, { Component } from 'react';
import {connect} from 'react-redux';


import {addReminder} from '../actions/ReminderAction.js';

class App extends Component {

  submitReminder(e) {
    e.preventDefault();
    let text = this.refs.reminder.value;

    console.log('text is ', text);

    this.props.setNewReminder(text);
    this.refs.reminder.value = '';
  }

  render() {
    console.log('this props: ', this.props);
    return (
      <div className="container">
        <form onSubmit={this.submitReminder.bind(this)}>
        <div className="title">
        Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group">
            <input className="form-control" ref="reminder" placeholder="i have to ..." />
            <button type="submit" className="btn btn-success" >Add Reminder</button>
          </div>
        </div>
        </form>
        <ul className="list-group">
        {this.props.AppReminderReducer.map((value, key) => {
          return <li className="list-group-item" key={key}><div>{value.text}</div></li>
        })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppReminderReducer: state.ReminderReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewReminder: (text) => {
      dispatch(addReminder(text));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
