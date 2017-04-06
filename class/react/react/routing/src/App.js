import React, { Component } from 'react';
import {Link} from 'react-router';

class App extends Component {
  
  navigate(e) {
    e.preventDefault(); // will prevent user to go to href page
    //mentioned here
    
    this.props.router.push('about');
  }
  
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/about/3456666">About With Id</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blahblah">Dummy Page</Link></li>
          <li><a href="" onClick={this.navigate.bind(this)}>Go to About Page</a></li>
        </ul>
      
        <br />
      
        {this.props.children}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home.....</h1>
      </div>
    );
  }
}


class About extends Component {
  render() {
    console.log(this.props.params.id);
    console.log(this.props.location.query);
    return (
      <div>
        <h1>About.....</h1>
      </div>
    );
  }
}


class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Contact.....</h1>
      </div>
    );
  }
}


class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>No Page Found, please try different urls.....</h1>
      </div>
    );
  }
}


exports.App = App;
exports.Home = Home;
exports.About = About;
exports.Contact = Contact;
exports.PageNotFound = PageNotFound;
