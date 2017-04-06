import React, { Component } from 'react';

import GitHubActions from '../actions/GitHubActions.js';

class Search extends Component {

  onSubmitMe(e) {
    e.preventDefault(); //to avoid page refresh

    let username = this.refs.username.value;

    if (!username) {
      alert('please enter the username');
      return;
    }

    GitHubActions.changeUsernameAction(username);
    GitHubActions.changeUserDataAction(username);
    GitHubActions.changeUserReposAction(username);
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
