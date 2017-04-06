import React, { Component } from 'react';

import GitHubAction from '../actions/GitHubAction.js';

class Search extends Component {
  
  onSubmitMe(e) {
    e.preventDefault(); //to avoid page refresh
    
    let username = this.refs.username.value;
    
    if (!username) {
      alert('please enter the username');
      return;
    }
    //call action
    GitHubAction.changeUsernameAction(username);
    GitHubAction.getUserDataAction(username);
    GitHubAction.getUserRepoAction(username);
    this.refs.username.value = '';
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