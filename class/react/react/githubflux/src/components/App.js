import React, { Component } from 'react';
import GitHubStore from '../stores/GitHubStore.js';
import Search from './Search.js';
import Profile from './Profile.js';
import GitHubActions from '../actions/GitHubActions.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: GitHubStore.getUsername(),
      userData: GitHubStore.getUserData(),
      userRepos: GitHubStore.getUserRepos()
    }
  }

  componentWillMount() {
    GitHubStore.on('change', () => {
      this.setState({username: GitHubStore.getUsername(), userData: GitHubStore.getUserData(), userRepos: GitHubStore.getUserRepos()})
    })
  }

  componentWillUnmount() {
    GitHubStore.removeListerner('change');
  }

  componentDidMount() {
    GitHubActions.changeUserDataAction(this.state.username);
    GitHubActions.changeUserReposAction(this.state.username);
  }

  render() {
    console.log('the state is ', this.state);
    return (
      <div className="container">
        <Search />
        <Profile {...this.state} />
      </div>
    );
  }
}

export default App;
