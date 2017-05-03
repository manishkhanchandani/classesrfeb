import React, { Component } from 'react';
import {connect} from 'react-redux';
import './NavBar.css';
import {logOut} from '../../actions/UserAction.js';
import {firebaseApp} from '../../MyFirebase.js';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  
  signOut(e) {
      e.preventDefault();
      firebaseApp.auth().signOut().then(() => {
        this.props.logUserOut();
      });
  }
  
  render() {
    let ipDetails = [];
    if (this.props.my.ipDetails) {
      ipDetails.push(<li key="0" role="separator" className="divider"></li>);
      ipDetails.push(<li key="1" className="dropdown-header">Location</li>);
      var location1 = [];
      var location2 = [];
      for (var x in this.props.my.ipDetails) {
        if (x === 'ip') {
          ipDetails.push(<li key="2"><Link to="/">{this.props.my.ipDetails[x]}</Link></li>);
          continue;
        }
        if (x === 'lat' || x === 'lng') {
          location2.push(this.props.my.ipDetails[x]);
          continue;
        }
        
        location1.push(this.props.my.ipDetails[x]); 
      }
      
      var locationString1 = location1.join(', ');
      ipDetails.push(<li key="3"><Link to="/">{locationString1}</Link></li>);
      var locationString2 = location2.join(', ');
      ipDetails.push(<li key="4"><Link to="/">{locationString2}</Link></li>);
    }
    
    var username = 'User';
    if (this.props.user && this.props.user.uid) {
      username = this.props.user.displayName + ' (' + this.props.user.email + ')';
    }
    
    return (
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <Link to="/" className="navbar-brand">Donation</Link>
              </div>
              <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{username}<span className="caret"></span></a>
                    {
                      (this.props.user.uid) ?
                        <ul className="dropdown-menu">
                          <li><Link to="/">My Account</Link></li>
                          <li><a href="" onClick={this.signOut.bind(this)}>Sign Out</a></li>
                          {ipDetails}
                        </ul>
                      :
                      <ul className="dropdown-menu">
                        <li><Link to="/auth/signin">Sign In</Link></li>
                        <li><Link to="/auth/signup">Sign Up</Link></li>
                        {ipDetails}
                      </ul>
                    }
                    </li>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
    my: state.MyReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: () => {
      dispatch(logOut());
    }
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);