import React, { Component } from 'react';

import GitHubStore from '../stores/GitHubStore.js';
import GitHubAction from '../actions/GitHubAction.js';

import Search from './Search.js';
import Profile from './Profile.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: GitHubStore.getUsername(), //this will come from store
      userData: null,
      userRepos: null
    }
  }

  componentWillMount() {
    GitHubStore.on('change', () => {
      this.setState({username: GitHubStore.getUsername(), userData: GitHubStore.getUserData(), userRepos: GitHubStore.getUserRepo()});
    });
  }

  componentWillUnmount() {
    GitHubStore.removeListener('change', () => {
      this.setState({username: GitHubStore.getUsername(), userData: GitHubStore.getUserData(), userRepos: GitHubStore.getUserRepo()});
    });
  }

  componentDidMount() {
    GitHubAction.getUserDataAction(this.state.username);
    GitHubAction.getUserRepoAction(this.state.username);
  }


  render() {
    console.log('state is ', this.state);
    return (
      <div className="container">
        <h1>GitHub Project for user {this.state.username}</h1>
        <Search />
        <Profile {...this.state} />
      </div>
    );
  }
}

export default App;
