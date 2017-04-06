import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    console.log('props: ', this.props);
    
    let img = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    if (this.props.artist.images && this.props.artist.images[0] && this.props.artist.images[0].url) {
      img = this.props.artist.images[0].url;
    }
    
    return (
      <div className="row">
      <div className="col-md-3">
        
      </div> 
      <div className="col-md-2">
        <img src={img} alt="Profile" className="img-responsive img-circle"/>
      </div> 
      <div className="col-md-4 text-left">
        <div className="profile-info">
          <div className="profile-name">{this.props.artist.name}</div>
          <div className="profile-followers">{this.props.artist.followers.total} followers</div>
          <div className="profile-genres">{this.props.artist.genres.map((genre, i) => {
            genre = genre !== this.props.artist.genres[this.props.artist.genres.length - 1] ? ` ${genre},` : ` & ${genre}`;
            return (<span key={i}>{genre} </span>);
          })}</div>      
        </div>
        </div> 
        
        
        <div className="col-md-3">

        </div> 
      </div>
    );
  }
}

export default Profile;