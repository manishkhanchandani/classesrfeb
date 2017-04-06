import React, { Component } from 'react';

class Profile extends Component {
  render() {
    
    if (!this.props.artist) {
      return (<div></div>);
    }
    
    return (
      <div className="row">
        <div className="col-md-4">
          <img src={this.props.artist.images[0].url} alt="Profile" className="img-responsive img-thumbnail" />
        </div>
        <div className="col-md-8">
          <h3>{this.props.artist.name}</h3>    
          <span className="label label-default">{this.props.artist.followers.total} followers</span>
              <br />
          <span className="label label-primary">{this.props.artist.popularity} Popularity</span>
              
          <br />
          <br />
          <br />
          <a href={this.props.artist.external_urls.spotify} target="_blank" className="btn btn-primary">View Profile</a>
        </div>
      </div>
    );
  }
}

export default Profile;