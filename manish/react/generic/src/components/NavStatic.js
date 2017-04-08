import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Link  } from 'react-router';
import {firebaseApp} from '../firebase.js';
import {logOut} from '../actions/UserAction.js';

import '../css/NavStatic.css';

class NavStatic extends Component {
  signOut(e) {
      e.preventDefault();
      firebaseApp.auth().signOut().then(() => {
        this.props.logUserOut();
      });
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="" onClick={(event) => {event.preventDefault()}}>Project name</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="home">Home</Link></li>
              <li><Link to="home2">Home2</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Projects <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to="nearby">Nearby</Link></li>
                  <li><Link to="create">Create</Link></li>
                  {/*
                  <li className="dropdown-header">Common</li>
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li className="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                  <li className="dropdown-header">Donation Website</li>
                  */}
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="../navbar/">Default</a></li>
              <li><a href="./">Static top <span className="sr-only">(current)</span></a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User<span className="caret"></span></a>
              {
                (this.props.user.uid) ?
                  <ul className="dropdown-menu">
                    <li><Link to="home">{this.props.user.email}</Link></li>
                    <li><a href="" onClick={this.signOut.bind(this)}>Sign Out</a></li>
                  </ul>
                :
                <ul className="dropdown-menu">
                  <li><Link to="auth/signin">Sign In</Link></li>
                  <li><Link to="auth/signup">Sign Up</Link></li>
                </ul>
              }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('state is ', state);
  return {
    user: state.UserReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: () => {
      dispatch(logOut());
    }
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavStatic);
