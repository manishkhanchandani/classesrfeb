import React, { Component } from 'react';
import {connect} from 'react-redux';
import './NavBar.css';
import {logOut} from '../../actions/UserAction.js';
import Config from '../../includes/config.js';
import {firebaseApp} from '../../MyFirebase.js';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: null
    }
  }
  
  componentDidMount() {
    this.setState({
      categories: Config.categories
    });
  }
  
  signOut(e) {
      e.preventDefault();
      firebaseApp.auth().signOut().then(() => {
        this.props.logUserOut();
      });
  }
  
  render() {
    if (!this.state.categories) {
      return false;
    }
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
    
    var categories = this.state.categories;
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
                  <Link to="/" className="navbar-brand">CategoryList.us</Link>
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
                  <ul className="nav navbar-nav">
                      <li><a href="#">Post</a></li>
                      <li>
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Categories <b className="caret"></b></a>
                          <ul className="dropdown-menu">
                              {
                                Object.keys(categories).map((value, key) => {
                                  return <li key={value} className="dropdown-submenu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">{categories[value].name}</a>
                                    <ul className="dropdown-menu">
                                      {
                                        Object.keys(categories[value].childs).map((value2, key2) => {
                                          let myLink = '/category/' + value + '/' + value2;
                                          return <li key={value2} ><Link to={myLink}>{categories[value].childs[value2].name}</Link></li>
                                        })
                                      }
                                    </ul>
                                  </li>
                                })
                              }
                          </ul>
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