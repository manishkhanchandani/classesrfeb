import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import Profile from './Profile';
import Match from './Match';
import './index.css';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

ReactDOM.render(
  (
   <Router history={browserHistory}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="profile" component={Profile} />
         <Route path="match" component={Match} />
      </Route>
   </Router>
	
  ),
  document.getElementById('root')
);
