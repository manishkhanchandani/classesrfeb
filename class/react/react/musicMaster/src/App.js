import React, { Component } from 'react';
import './App.css';

import Profile from './Profile.js';
import Gallery from './Gallery.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      query: '',
      artist: null,
      topTracks: null
    };
  }
  
  changeQuery(e) {
    this.setState({query: e.target.value});
  }
  
  search(e) {
    e.preventDefault();
    console.log(this.state);
    
    const query = encodeURIComponent(this.state.query);
    
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;
    console.log(url);
    
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({artist: null});
      if (j.artists.total > 0) {
        const artist = j.artists.items[0];
        this.setState({artist: artist});
        
        const url2 = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=US`;
        console.log('url2 is ', url2);
        fetch(url2, {
          method: 'GET'
        }).then((response) => {
          return response.json();
        }).then((j) => {
          console.log('j2 is ', j.tracks);
          this.setState({topTracks: j.tracks});
        }).catch((err) => {
          console.log('error is ', err);
        });
        
        
        
      }//end if
      
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  render() {
    return (
      <div className="App container">
        <div className="App-title">Music Master</div>
        <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
          <form onSubmit={this.search.bind(this)}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for an Artist" value={this.state.query} onChange={this.changeQuery.bind(this)} />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="submit" onClick={this.search.bind(this)}>Go!</button>
            </span>
          </div>
          </form>
        </div>
        {
          this.state.artist !== null 
          ?
            <div>
              <Profile artist={this.state.artist} />
              <Gallery tracks={this.state.topTracks} />
            </div>
          :
          <div></div>
        }
        
      </div>
    );
  }
}

export default App;
