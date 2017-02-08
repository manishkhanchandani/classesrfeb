import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App';
import IntroPage from './components/IntroPage';
import HealthprintLayout from './components/Healthprint';
import HealthprintResults from './components/HealthprintResults';
import PageNotFound from './PageNotFound';


import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IntroPage} />
            <Route path="/IntroPage" component={IntroPage}/>
            <Route path="/healthprint/:qid" component={HealthprintLayout}/>
            <Route path="/healthprint/:template/:qid" component={HealthprintLayout}/>
            <Route path="/healthprint" component={HealthprintLayout}/>
            <Route path="/healthprint-results" component={HealthprintResults}/>
        </Route>
        <Route path="*" component={PageNotFound} />
    </Router>,
  document.getElementById('healthprint')
);