import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../components/nav/NavBar.js';


import Landing from '../components/Landing.js';
import SignIn from '../components/auth/SignIn.js';
import SignUp from '../components/auth/SignUp.js';
import List from '../components/List.js';
import New from '../components/New.js';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
      
          <div className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"><b>DONATION</b></a>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Already a member?</a></li>
                </ul>
              </div>
            </div>
          </div>
    
      
      
            
          
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/create" component={New} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng" component={List} />
      
            <Route exact={true} path="/category/:category/:subcategory" component={List} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />


      </div>
      </Router>
    );
  }
}

export default App;
