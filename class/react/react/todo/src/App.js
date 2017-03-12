import React, { Component } from 'react';
import './App.css';
import { Link  } from 'react-router';

class App extends Component {
  render() {
      return (
         <div>
            <ul>
               <li><Link to="/home">Home</Link></li>
               <li><Link to="/about">About</Link></li>
            </ul>
				
           {this.props.children}
         </div>
      )
   }
}

export default App;
