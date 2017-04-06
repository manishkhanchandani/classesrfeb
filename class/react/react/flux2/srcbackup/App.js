import React, { Component } from 'react';

import GitHubStore from './stores/GitHubStore.js';
import * as GitHubActions from './actions/GitHubActions.js';

import Search from './components/Search.js';
import Profile from './components/Profile.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: GitHubStore.getUsername(),
      userData: [],
      userRepos: []
    };
  }
  
  componentWillMount() {
    GitHubStore.on('change', () => {
      this.setState({name: GitHubStore.getUsername(), userData: GitHubStore.getUserData(), userRepos: GitHubStore.changeUserRepos()});
    });
  }
  
  handleFormSubmit(username) {
    this.setState({username: username}, () => {
      this.getUserData();
      this.getUserRepos();
    });
  }
  
  
  getUserRepos() {
    const url = 'https://api.github.com/users/' + this.state.username + '/repos?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created';
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      //console.log('j repos is ', j);
      this.setState({userRepos: j});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  componentDidMount() {
    GitHubActions.changeUserDataAction(this.state.username);
    this.getUserRepos();
  }
  
  render() {
    console.log('state is ', this.state);
    return (
      <div className="container">
        <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
        <Profile {...this.state} />
      </div>
    );
  }
}

App.defaultProps = {
  clientId: 'aa4faeb7c85cb1c3b1be',
  clientSecret: '8d8a34cb129d75c137597f97b5a0f587fc3c616f'
};

export default App;
