import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import {Provider} from 'react-redux';
import store from './store.js';

import Home from './components/Home.js'
import App from './components/App.js';
import AboutUs from './components/AboutUs.js';
import ContactUs from './components/ContactUs.js';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="aboutus" component={AboutUs} />
        <Route path="contactus" component={ContactUs} />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
