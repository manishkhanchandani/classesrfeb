import React, { Component } from 'react';
import './App.css';

import Search from './Search.js';
import Profile from './Profile.js';
import Songs from './Songs.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      query: '',
      artist: null,
      topTracks: null,
    }
  }
  
  changeQuery(q) {
    this.setState({query: q}, () => {
      this.getData();
    });
  }
  
  getData() {

    const query = encodeURIComponent(this.state.query);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({artist: j.artists.items[0]});
      this.getSongs(j.artists.items[0].id);
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  getSongs(id) {
    console.log('id is ', id);
    const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({topTracks: j.tracks});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  
  render() {
    console.log("this is state is ", this.state);
    return (
      <div className="container">
        <h1>Music Master</h1>
        <Search onChangeQuery={this.changeQuery.bind(this)} />
        <Profile artist={this.state.artist} />
        <Songs topTracks={this.state.topTracks} />
      </div>
    );
  }
}

export default App;
