import React, { Component } from 'react';
import { Link  } from 'react-router'

class App extends Component {
  
  navigate(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.router.push('contact');
  }
   render() {
      return (
         <div>
            <ul>
               <li><Link to="/home">Home</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/about/1">About with ID</Link></li>
               <li><Link to="/contact">Contact</Link></li>
               <li><Link to="/xxx">xx</Link></li>
              <li><a href="" onClick={this.navigate.bind(this)}>Click here</a></li>
            </ul>
				
           {this.props.children}
         </div>
      )
   }
}


class Home extends Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}

class About extends Component {
   render() {
     console.log(this.props);
     console.log(this.props.location.query);
      return (
         <div>
            <h1>About...</h1>
         </div>
      )
   }
}


class Contact extends Component {
   render() {
      return (
         <div>
            <h1>Contact...</h1>
         </div>
      )
   }
}

class PageNotFound extends Component {
   render() {
      return (
         <div>
            <h1>Page Not Found...</h1>
         </div>
      )
   }
}


exports.App = App;
exports.Home = Home;
exports.About = About;
exports.Contact = Contact;
exports.PageNotFound = PageNotFound;
