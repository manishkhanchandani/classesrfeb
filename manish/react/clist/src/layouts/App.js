import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../components/nav/NavBar.js';


import Home from '../containers/Home.js';
import SignIn from '../components/auth/SignIn.js';
import SignUp from '../components/auth/SignUp.js';
import List from '../components/List.js';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Header</h2>
                <hr />
              </div>
            </div>
            
          
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/category/:category/:subcategory" component={List} />
            <Route exact={true} path="/category/:category" component={List} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />


            <div className="row">
              <div className="col-md-12">
                <hr />
                <h2>Footer</h2>
              </div>
            </div>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
