import React, { Component } from 'react';

import Search from './components/Search.js';
import Profile from './components/Profile.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'manishkhanchandani',
      userData: [],
      userRepos: []
    };
  }
  
  getUserData() {
    const url = 'https://api.github.com/users/' + this.state.username+'?client_id=' + this.props.clientId+'&client_secret=' + this.props.clientSecret;
    console.log('url is ', url);
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({userData: j});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  getUserRepos() {
    const url = 'https://api.github.com/users/' + this.state.username+'/repos?client_id=' + this.props.clientId+'&client_secret=' + this.props.clientSecret+'&sort=created&per_page=15';
    console.log('url is ', url);
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({userRepos: j});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  handleFormSubmit(username) {
    this.setState({username: username}, () => {
      this.getUserData();
      this.getUserRepos();
    });
  }
  
  componentDidMount() {
    this.getUserData();
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
  clientId: '85ed9b6325343133f7cc',
  clientSecret: '2be6c435e81399b75348100d909f3ea7a2e226a1'
};

export default App;
