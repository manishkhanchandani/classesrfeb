import React, { Component } from 'react';
import { Link  } from 'react-router'

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="">Project name</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="active"><Link to="home">Home</Link></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><Link to="linkedlist">Linked List</Link></li>
                    <li><Link to="singlelinkedlists">Single Linked Lists</Link></li>
                    <li><Link to="array">DS Array</Link></li>
                    <li><Link to="stacks">Stacks</Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="../navbar/">Default</a></li>
                <li className="active"><a href="./">Static top <span className="sr-only">(current)</span></a></li>
                <li><a href="../navbar-fixed-top/">Fixed top</a></li>
              </ul>
            </div>
          </div>
        </nav>

    );
  }
}

export default Navigation;
