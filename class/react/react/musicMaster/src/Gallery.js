import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }
  
  
  playAudio(previewUrl, e) {
    e.preventDefault();
    let audio = new Audio(previewUrl);
    
    if (!this.state.playing) {
      audio.play();
      this.setState({playing: true, playingUrl: previewUrl, audio: audio});
    } else {
      this.state.audio.pause();
      if (previewUrl === this.state.playingUrl) {
        //pause the audio
        this.setState({playing: false});
      } else {
        audio.play();
        this.setState({playing: true, playingUrl: previewUrl, audio: audio});
      }
    }
  }
  
  render() {
    if (!this.props.tracks) {
      return (<div></div>);
    }
    console.log('tracks are ', this.props.tracks);
    return (
      <div className="row">
        <div className="col-md-12">
        {this.props.tracks.map((track, k) => {
          return (<div key={k} className="row track">
            <div className="col-md-3">
              <img src={track.album.images[0].url} alt="track" className="track-img img-responsive img-thumbnail" />
            </div>
            <div className="col-md-9 text-left">
              <p className="track-text">{track.name}</p>
              <p><a href="" onClick={this.playAudio.bind(this, track.preview_url)}>Preview</a></p>
              <p><a href={track.external_urls.spotify} target="_blank">View on Spotify</a></p>
            </div>
          </div>)
        })}
        </div>
      </div>
    );
  }
}

export default Gallery;