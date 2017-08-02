import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../components/nav/NavBar.js';

import Routing1 from './Routing1.js';
import Routing2 from './Routing2.js';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                
              </div>
            </div>
            
          
            <Routing1 />
			<Routing2 />


            <div className="row">
              <div className="col-md-12">
                
              </div>
            </div>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
