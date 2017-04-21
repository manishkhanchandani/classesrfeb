import React, { Component } from 'react';
import {connect} from 'react-redux';
import './NavBar.css';
import {logOut} from '../../actions/UserAction.js';
import Config from '../../includes/config.js';
import {firebaseApp} from '../../MyFirebase.js';
import { Link  } from 'react-router';
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
    console.log('state is ', this.state);
    if (!this.state.categories) {
      return false;
    }
    let ipDetails = [];
    if (this.props.my.ipDetails) {
      ipDetails.push(<li key="0" role="separator" className="divider"></li>);
      ipDetails.push(<li key="1" className="dropdown-header">Location</li>);
      for (var x in this.props.my.ipDetails) {
        ipDetails.push(<li key={x}><a href="">{x}: {this.props.my.ipDetails[x]}</a></li>);
      }
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
                  <a className="navbar-brand" href="#">NavBar</a>
              </div>
              <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User<span className="caret"></span></a>
                    {
                      (this.props.user.uid) ?
                        <ul className="dropdown-menu">
                          <li><Link to="home">{this.props.user.displayName} ({this.props.user.email}) {this.props.user.loggedInDate}</Link></li>
                          <li><a href="" onClick={this.signOut.bind(this)}>Sign Out</a></li>
                          {ipDetails}
                        </ul>
                      :
                      <ul className="dropdown-menu">
                        <li><Link to="auth/signin">Sign In</Link></li>
                        <li><Link to="auth/signup">Sign Up</Link></li>
                        {ipDetails}
                      </ul>
                    }
                    </li>
                  </ul>
                  <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Home</a></li>
                      <li>
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Menu 1 <b className="caret"></b></a>
                          <ul className="dropdown-menu multi-level">
                              <li><a href="#">Action</a></li>
                              <li><a href="#">Another action</a></li>
                              <li><a href="#">Something else here</a></li>
                              <li className="divider"></li>
                              <li><a href="#">Separated link</a></li>
                              <li className="divider"></li>
                              <li><a href="#">One more separated link</a></li>
                              <li className="dropdown-submenu">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
                                  <ul className="dropdown-menu">
                                      <li><a href="#">Action</a></li>
                                      <li className="dropdown-submenu">
                                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
                                          <ul className="dropdown-menu">
                                              <li className="dropdown-submenu">
                                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
                                                  <ul className="dropdown-menu">
                                                      <li><a href="#">Action</a></li>
                                                      <li><a href="#">Another action</a></li>
                                                      <li><a href="#">Something else here</a></li>
                                                      <li className="divider"></li>
                                                      <li><a href="#">Separated link</a></li>
                                                      <li className="divider"></li>
                                                      <li><a href="#">One more separated link</a></li>
                                                  </ul>
                                              </li>
                                          </ul>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
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
                                          let myLink = 'category/' + value + '/' + value2;
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