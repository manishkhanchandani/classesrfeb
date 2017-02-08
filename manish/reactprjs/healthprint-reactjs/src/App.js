import React, { Component } from 'react';
import { Link} from 'react-router';
import './App.css';
import './healthprint.css';
import './css/healthprint.css';


class App extends Component {
  render() {
      return (
          <div>
              <ul className="">
                  <li><Link to="/IntroPage">IntroPage</Link></li>
                  <li><Link to="/healthprint">healthprint</Link></li>
                  <li><Link to="/healthprint-results">healthprint results</Link></li>
              </ul>
              {this.props.children}
          </div>
      );
  }
}

export default App;
