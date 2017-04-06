import React, { Component } from 'react';

class Songs extends Component {
  
  playAudio(url, e) {
    e.preventDefault();
    
    let audio = new Audio(url);
    audio.play();
    
  }
  
  render() {
    
    if (!this.props.topTracks) {
      return (<div></div>);
    }
    
    return (
      <div>
        <h3>Top Tracks</h3>
        <ul>
          {
            this.props.topTracks.map((value, i) => {
              return <li key={i}>{value.name} | <a href={value.external_urls.spotify} target="_blank">View on Spotify</a> | <a href="" onClick={this.playAudio.bind(this, value.preview_url)}>Preview</a></li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default Songs;