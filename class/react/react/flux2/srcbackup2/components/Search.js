import React, { Component } from 'react';

import * as GitHubAction from '../actions/GitHubAction.js';

class Search extends Component {
  
  onSubmitMe(e) {
    e.preventDefault(); //to avoid page refresh
    
    let username = this.refs.username.value;
    
    if (!username) {
      alert('please enter the username');
      return;
    }
    
    GitHubAction.changeUsernameAction(username);
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmitMe.bind(this)}>
        <label>Search Github Users</label>
        <input type="text" ref="username" className="form-control" />
        <br />
      </form>
    );
  }
}

export default Search;