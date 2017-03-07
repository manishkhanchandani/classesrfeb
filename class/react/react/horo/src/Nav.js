import React, { Component } from 'react';
import { Link  } from 'react-router';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/home">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/match">Match</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;