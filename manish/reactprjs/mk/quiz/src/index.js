import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';

import PageNotFound from './components/PageNotFound.jsx';
import IntroPage from './components/IntroPage.jsx';
import Manage from './components/Manage.jsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IntroPage} />
            <Route path="/IntroPage" component={IntroPage}/>
            <Route path="/Quiz" component={IntroPage}/>
            <Route path="/Quiz/:subject" component={IntroPage}/>
            <Route path="/Quiz/:subject/:set" component={IntroPage}/>
            <Route path="/Manage" component={Manage}/>
        </Route>
        <Route path="*" component={PageNotFound} />
    </Router>,
  document.getElementById('root')
);