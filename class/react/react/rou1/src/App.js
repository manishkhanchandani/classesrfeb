import React, { Component } from 'react';

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';


const _Gist = ({match}) => {
  return <div>{match.params.gistId}</div>
};

class Gist extends Component {
  render() {
    console.log('p is ', this.props);
    const gistId = this.props.match.params.gistId;
    return (
      <div>
        Main - {gistId}
      </div>
    );
  }
}


class TableData extends Component {
  render() {
    if (!this.props.gists) {
      return false;
    }
     
    return (
      <div>
        <table width="100%" cellPadding="5" cellSpacing="0" className="myTable">
          <tbody>
          <tr>
            <td className="myTd leftTd">
              {this.props.gists.map((value, key) => {
                return <div key={key}><Link to={`/g/${value.id}`}>{value.description}</Link> <Link to={`/g2/${value.id}`}>{value.description}</Link></div>
              })}
            </td>
            <td className="myTd rightTd">
              <Route exact={true} path="/" render={() => {
                return <h1>Welcome</h1>
              }} />
              <Route path="/g/:gistId" component={Gist} />
              <Route path="/g2/:gistId" component={Gist} />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gists: null
    };
  }
  
  componentDidMount() {
    fetch('https://api.github.com/gists', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({gists: j});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  render() {
    console.log('state are ', this.state);
    return (
      <Router>
        <div>
          <h1>Main App</h1>
          <TableData gists={this.state.gists} />
        </div>
      </Router>
    );
  }
}

export default App;
