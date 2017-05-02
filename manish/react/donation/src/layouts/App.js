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
          <NavBar />
          <div className="container">
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/create" component={New} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng" component={List} />
      
            <Route exact={true} path="/category/:category/:subcategory" component={List} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </div>

      </div>
      </Router>
    );
  }
}

export default App;
