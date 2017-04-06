import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {App, Home, About, Contact, PageNotFound} from './App';

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="about" component={About} />
        <Route path="about/:id" component={About} />
        <Route path="contact" component={Contact} />
        <Route path="*" component={PageNotFound} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
